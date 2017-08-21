import {EventEmitter, Injectable} from "@angular/core";
import {Http} from "@angular/http";

import "rxjs/add/operator/toPromise";

import Project from "./project";
import {Subject} from "rxjs/Subject";
import ChecklistItem from "../checklist/checklist-item";

@Injectable()
export class ProjectService {

  private projectsUrl: string = "http://localhost:8080/projects";
  private headers = new Headers({"Content-type": "application/json"});

  // private addProjectEvent = new Subject<Project> ();
  // addProjectEvent$ = this.addProjectEvent.asObservable();

  constructor(private http: Http) {
  }

  getProjects(): Promise<Project[]> {
    return this.http.get(this.projectsUrl)
      .toPromise()
      .then(response => response.json() as Project[])
      .catch(this.handleError);

    // return Promise.resolve(PROJECTS);
  }

  addProject(project: Project): Promise<Project> {
    return this.http.post(this.projectsUrl, project)
      .toPromise()
      .then(response => response.json() as Project)
      .catch(this.handleError);
  }

  updateProject(project: Project): Promise<Project> {
    const url = `${this.projectsUrl}/${project.id}`;
    return this.http.put(url, project)
      .toPromise()
      .then(response => response.json() as Project)
      .catch(this.handleError);
  }

  deleteProject(project: Project): Promise<any> {
    const url = `${this.projectsUrl}/${project.id}`;
    return this.http.delete(url, project)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  addChecklistItem(projectId: number, checklistItem: ChecklistItem): Promise<ChecklistItem> {
    const url = `${this.projectsUrl}/${projectId}/checklist-items`;
    return this.http.post(url, checklistItem)
      .toPromise()
      .then(response => response.json() as ChecklistItem)
      .catch(this.handleError);
  }

  editChecklistItem(projectId: number, checklistItem: ChecklistItem): Promise<ChecklistItem> {
    const url = `${this.projectsUrl}/${projectId}/checklist-items/${checklistItem.id}`;
    return this.http.put(url, checklistItem)
      .toPromise()
      .then(response => response.json() as ChecklistItem)
      .catch(this.handleError);
  }

  deleteCompletedItems(projectId: number): Promise<any> {
    const url = `${this.projectsUrl}/${projectId}/checklist-items`
    return this.http.delete(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError)
  }

  getProject(id: number): void {

  }

  private handleError(error: any): Promise<any> {
    console.error("Error occurred!", error);
    return Promise.reject(error.message || error);
  }

}
