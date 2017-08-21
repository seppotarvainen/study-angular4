/**
 * Created by Seppo on 19/07/2017.
 */

import {Component, Input, OnInit} from "@angular/core";
import Project from "./project/project";
import {ProjectService} from "./project/project.service";

@Component({
  selector: "main",
  template: `
    <div class="col-md-3">
      <project-list [projects]="projects"
                    [selectedProject]="selectedProject"
                    (onSelectProject)="onSelectProject($event)"></project-list>

      <button class="btn btn-default" (click)="onClickAddProject()">
        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
        <span>Add project</span>
      </button>
    </div>

    <div class="col-md-9">
      <project-details (onEditProject)="onEditProject($event)"
                       (onAddProject)="onAddProject($event)"
                       (onChangeEditStatus)="onChangeEditStatus($event)"
                       (onDelete)="onDelete($event)"
                       (onLockProject)="lockProject($event)"
                       [project]="selectedProject"
                       [isEditMode]="isEditMode"></project-details>
    </div>
  `
})
export class MainComponent implements OnInit{
  selectedProject: Project;
  lastSelectedProject: Project;
  projects: Project[];
  isEditMode: boolean = false;
  isSelectedLocked: boolean = false;

  constructor(private projectService: ProjectService) {

  }  // injects only private parameters

  ngOnInit(): void {
    this.projectService.getProjects().then(
      projects => this.projects = projects
    );
  }

  onSelectProject(project: Project): void {
    if (!this.isEditMode && !this.isSelectedLocked){
      this.selectedProject = project;
      this.lastSelectedProject = project;
    }
  }

  onEditProject(project: Project): void{
    let index: number = this.projects.findIndex(p => p.id === project.id);
    this.projects[index] = project;
    console.log(project);
    this.onProjectFormSubmit(project);
  }

  onAddProject(project: Project): void {
    this.projects.push(project);
    this.selectedProject = project;
    this.onProjectFormSubmit(project);
  }

  onChangeEditStatus(value: boolean): void {
    this.isEditMode = value;
    this.selectedProject = this.lastSelectedProject;
  }

  onProjectFormSubmit(project: Project){
    this.selectedProject = project;
    this.lastSelectedProject = project;
    this.isEditMode = false;
  }

  onClickAddProject(): void {
    if (this.isSelectedLocked) return;

    this.selectedProject = new Project();
    console.log(this.selectedProject);
    this.isEditMode = true;
  }

  selectProjectByIndex(index: number){
    if (index - 1 >= 0) {
      this.selectedProject = this.projects[index - 1];
      this.lastSelectedProject = this.projects[index - 1];
    } else if (this.projects.length > 0) {
      let last = this.projects.length -1;
      this.selectedProject = this.projects[last];
      this.lastSelectedProject = this.projects[last];
    } else {
      this.selectedProject = null;
      this.lastSelectedProject = null;
    }
  }

  lockProject(isLocked: boolean) {
    this.isSelectedLocked = isLocked;
  }

  onDelete(project: Project) {
    let index: number = this.projects.findIndex(p => p.id === project.id);
    this.projects.splice(index, 1);
    this.selectProjectByIndex(index);

  }
}
