import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

import "rxjs/add/operator/toPromise";

import Project from "./project";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class ProjectService {

  private projectsUrl: string = "http://localhost:8080/projects";

  constructor(private http: Http) {
  }

  getProjects(): Promise<Project[]> {
    return this.http.get(this.projectsUrl)
      .toPromise()
      .then(response => response.json() as Project[])
      .catch(this.handleError);
  }

  addProject(project: Project): Promise<Project> {
    return this.http.post(this.projectsUrl, project)
      .toPromise()
      .then(response => {
        let project = response.json() as Project;
        this._projectList.next(project);
      })
      .catch(this.handleError);
  }

  updateProject(project: Project): Promise<Project> {
    const url = `${this.projectsUrl}/${project.id}`;
    return this.http.put(url, project)
      .toPromise()
      .then(response => {
        let project = response.json() as Project;
        this._projectListEdit.next(project);
      })
      .catch(this.handleError);
  }

  deleteProject(project: Project): Promise<any> {
    const url = `${this.projectsUrl}/${project.id}`;
    return this.http.delete(url, project)
      .toPromise()
      .then(() => this._projectListDelete.next(project.id))
      .catch(this.handleError);
  }

  setLock(lockState: boolean): void {
    this._lock.next(lockState);
  }

  private handleError(error: any): Promise<any> {
    console.error("Error occurred!", error);
    return Promise.reject(error.message || error);
  }

  private _projectList = new BehaviorSubject<Project>(null);
  projectList$ = this._projectList.asObservable();

  private _projectListEdit = new BehaviorSubject<Project>(null);
  projectListEdit$ = this._projectListEdit.asObservable();

  private _projectListDelete = new BehaviorSubject<number>(-1);
  projectListDelete$ = this._projectListDelete.asObservable();

  private _lock = new BehaviorSubject<boolean>(false);
  lock$ = this._lock.asObservable();
}
