import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

import "rxjs/add/operator/toPromise";

import Project from "./project";
import ChecklistItem from "../checklist/checklist-item";
import {BaseService} from "../utils/base.service";
import {AuthService} from "../utils/auth.service";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import SubProject from "../subproject/sub-project";
import Recording from "../timer/recording";

/**
 * Handles project related server side actions.
 */
@Injectable()
export class ProjectService extends BaseService{

  private projectsUrl: string;
  private isLocked: boolean = false;
  private currentRunningTime: number = 0;

  // private addProjectEvent = new Subject<Project> ();
  // addProjectEvent$ = this.addProjectEvent.asObservable();

  constructor(private http: Http, private authentication: AuthService, private router: Router) {
    super(authentication);
    this.projectsUrl = this.baseUrl + "/projects";
  }

  /**
   * Get single project from the server
   * @param projectId - project projectId
   * @returns {Promise<any|Project>}
   */
  getProject(projectId: number): Promise<Project> {
    const url = `${this.projectsUrl}/${projectId}`;
    return this.http.get(url, this.getHeaders())
      .toPromise()
      .then(response => {
        console.log(response.json());
        return response.json() as Project
      })
      .catch(this.handleError);
  }

  /**
   * Get all projects from the server
   * @returns {Promise<any|Project[]>}
   */
  getProjects(): Promise<Project[]> {
    return this.http.get(this.projectsUrl, this.getHeaders())
      .toPromise()
      .then(response => response.json() as Project[])
      .catch(this.handleError);
  }

  /**
   * Add a single project
   * @param project project to add
   * @returns {Promise<any|Project>}
   */
  addProject(project: Project): Promise<Project> {
    return this.http.post(this.projectsUrl, project, this.getHeaders())
      .toPromise()
      .then(response => {
        let project = response.json() as Project;
        this._projectList.next(project);
        return project;
      })
      .catch(this.handleError);
  }

  /**
   * Update project
   * @param project project to update, must have projectId attribute.
   * @returns {Promise<any|Project>}
   */
  updateProject(project: Project): Promise<Project> {
    console.log("EDIT");

    const url = `${this.projectsUrl}/${project.id}`;
    return this.http.put(url, project, this.getHeaders())
      .toPromise()
      .then(response => {
        let project = response.json() as Project;
        this._projectList.next(project);
        return project;
      })
      .catch(this.handleError);
  }

  /**
   * Delete project
   * @param project - project to delete, must have projectId attribute.
   * @returns {Promise<any>}
   */
  deleteProject(project: Project): Promise<any> {
    const url = `${this.projectsUrl}/${project.id}`;
    return this.http.delete(url, this.getHeaders())
      .toPromise()
      .then(() => {
        this._projectListDelete.next(project.id);
      })
      .catch(this.handleError);
  }

  /**
   * Add sub project to given project
   * @param projectId - parent project
   * @param subProject - new sub project
   * @returns {Promise<never|SubProject>}
   */
  addSubProject(projectId: number, subProject: SubProject): Promise<SubProject> {
    const url = `${this.projectsUrl}/${projectId}/sub-projects`;
    console.log(url);
    console.log("ADDING...");
    return this.http.post(url, subProject, this.getHeaders())
      .toPromise()
      .then(response => {
        return response.json() as SubProject;
      })
      .catch(this.handleError);
  }

  /**
   * Update sub project of given project
   * @param projectId - parent project
   * @param subProject - new sub project data
   * @returns {Promise<never|SubProject>}
   */
  updateSubProject(projectId: number, subProject: SubProject): Promise<SubProject> {
    const url = `${this.projectsUrl}/${projectId}/sub-projects/${subProject.id}`;

    return this.http.put(url, subProject, this.getHeaders())
      .toPromise()
      .then(response => {
        return response.json() as SubProject;
      })
      .catch(this.handleError);
  }

  /**
   * Delete given sub project
   * @param projectId - parent project
   * @param subProject - sub project to delete
   * @returns {Promise<never|null>}
   */
  deleteSubProject(projectId: number, subProject: SubProject) {
    const url = `${this.projectsUrl}/${projectId}/sub-projects/${subProject.id}`;

    return this.http.delete(url, this.getHeaders())
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  createRecording(projectId: number, subProjectId: number, recording: Recording) {
    const url = `${this.projectsUrl}/${projectId}/sub-projects/${subProjectId}/recordings`;

    return this.http.post(url, recording, this.getHeaders())
      .toPromise()
      .then(response => response.json() as Recording)
      .catch(this.handleError);
  }

  /**
   * Add new checklist item to sub project
   * @param projectId - project
   * @param subProjectId - sub project
   * @param checklistItem - new checklist item
   * @returns {Promise<any|ChecklistItem>}
   */
  addChecklistItem(projectId: number, subProjectId:number, checklistItem: ChecklistItem): Promise<ChecklistItem> {
    const url = `${this.projectsUrl}/${projectId}/sub-projects/${subProjectId}/checklist-items`;
    return this.http.post(url, checklistItem, this.getHeaders())
      .toPromise()
      .then(response => response.json() as ChecklistItem)
      .catch(this.handleError);
  }

  /**
   * Edit sub project checklist item
   * @param projectId
   * @param subProjectId
   * @param checklistItem
   * @returns {Promise<never|ChecklistItem>}
   */
  editChecklistItem(projectId: number, subProjectId: number, checklistItem: ChecklistItem): Promise<ChecklistItem> {
    const url = `${this.projectsUrl}/${projectId}/sub-projects/${subProjectId}/checklist-items/${checklistItem.id}`;
    return this.http.put(url, checklistItem, this.getHeaders())
      .toPromise()
      .then(response => response.json() as ChecklistItem)
      .catch(this.handleError);
  }

  /**
   * Delete completed items of given sub project
   * @param projectId
   * @param subProjectId
   * @returns {Promise<never|any>}
   */
  deleteCompletedItems(projectId: number, subProjectId: number): Promise<any> {
    const url = `${this.projectsUrl}/${projectId}/sub-projects/${subProjectId}/checklist-items`;
    return this.http.delete(url, this.getHeaders())
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError)
  }

  /**
   * Set locked status.
   * @param value
   */
  setLocked(value: boolean) {
    this.isLocked = value;
    this._lock.next(value);
  }
  getLocked(): boolean {return this.isLocked;}

  setRunningCurrentTime(timeInSeconds: number) {
    this.currentRunningTime = timeInSeconds;
    // this._runningCurrentTime.next(timeInSeconds);
  }

  getRunningCurrentTime(): number {
    console.log(this.currentRunningTime);
    return this.currentRunningTime;
  }

  /** Subjects **/

  private _projectList = new BehaviorSubject<Project>(null);
  projectList$ = this._projectList.asObservable();

  private _projectListDelete = new BehaviorSubject<number>(-1);
  projectListDelete$ = this._projectListDelete.asObservable();

  private _runningCurrentTime = new BehaviorSubject<number>(0);
  runningCurrentTime$ = this._runningCurrentTime.asObservable();

  private _lock = new BehaviorSubject<boolean>(false);
  lock$ = this._lock.asObservable();

  // updateList(p: Project) {
  //   this._projectList.next(p);
  // }


}
