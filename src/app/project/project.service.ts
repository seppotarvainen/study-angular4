import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

import "rxjs/add/operator/toPromise";

import Project from "./project";

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

  private handleError(error: any): Promise<any> {
    console.error("Error occurred!", error);
    return Promise.reject(error.message || error);
  }
}
