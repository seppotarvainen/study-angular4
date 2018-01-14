/**
 * Created by Seppo on 19/07/2017.
 */

import {Component, OnInit} from "@angular/core";
import Project from "./project/project";
import {ProjectService} from "./project/project.service";
import {ProjectFormEvent} from "./utils/project-form-event";

@Component({
  selector: "main",
  template: `
    <div class="col-md-3">
      <project-list [projects]="projects"
                    [selectedProject]="selectedProject"
                    [locked]="locked"
                    (onSelectProject)="onSelectProject($event)"></project-list>

      <button class="btn btn-default" [disabled]="locked" (click)="onClickAddProject()">
        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
        <span>Add project</span>
      </button>
    </div>

    <div class="col-md-9">
      <project-details [isEditMode]="isEditMode" [project]="selectedProject" (onChangeEditStatus)="changeEditStatus($event)"></project-details>
    </div>
  `
})
export class MainComponent implements OnInit{
  selectedProject: Project;
  projects: Project[];
  isEditMode: boolean = false;
  locked: boolean = false;

  constructor(private projectService: ProjectService) {

    this.projectService.projectList$.subscribe(project => {
      if (project) this.onAddProject(project);
    });

    this.projectService.projectListEdit$.subscribe(project => {
      if (project) this.onUpdateProject(project);
    });

    this.projectService.projectListDelete$.subscribe(projectId => {
      if (projectId >= 0) this.onDelete(projectId);
    });

    this.projectService.lock$.subscribe(state => this.locked = state);
  }

  ngOnInit(): void {
    this.projectService.getProjects().then(
      projects => this.projects = projects
    );
  }

  onSelectProject(project: Project): void {
    this.selectedProject = project;
  }

  onUpdateProject(project: Project): void {
    this.projects = this.projects.map(p => p.id === project.id ? project : p);
    this.selectedProject = project;
    this.isEditMode = false;
  }

  onAddProject(project: Project): void {
    this.projects.push(project);
    this.selectedProject = project;
    this.isEditMode = false;
  }

  onClickAddProject(): void {
    this.selectedProject = new Project();
    this.isEditMode = true;
  }

  onDelete(projectId: number) {
    this.projects = this.projects.filter(p => p.id !== projectId);
    this.selectedProject = null;
  }

  changeEditStatus(event: ProjectFormEvent) {
    this.selectedProject = event.projectToSelect;
    this.isEditMode = event.editStatus;
  }
}
