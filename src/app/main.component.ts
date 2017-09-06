/**
 * Created by Seppo on 19/07/2017.
 */

import {Component, Input, OnInit} from "@angular/core";
import Project from "./project/project";
import {ProjectService} from "./project/project.service";
import {Router} from "@angular/router";

@Component({
  selector: "main",
  template: `
    <div class="col-md-3">
      <project-list [projects]="projects"></project-list>
    </div>

    <div class="col-md-9">
      <router-outlet></router-outlet>
      <!--<project-details (onEditProject)="onEditProject($event)"-->
                       <!--(onAddProject)="onAddProject($event)"-->
                       <!--(onChangeEditStatus)="onChangeEditStatus($event)"-->
                       <!--(onDelete)="onDelete($event)"-->
                       <!--(onLockProject)="lockProject($event)"-->
                       <!--[project]="selectedProject"-->
                       <!--[isEditMode]="isEditMode"></project-details>-->
    </div>
  `
})
export class MainComponent implements OnInit{
  selectedProject: Project;
  lastSelectedProject: Project;
  projects: Project[];
  isEditMode: boolean = false;
  // isSelectedLocked: boolean = false;

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.projectService.getProjects().then(
      projects => this.projects = projects
    );
  }

  // onSelectProject(project: Project): void {
  //   if (!this.isEditMode && !this.isSelectedLocked){
  //     this.selectedProject = project;
  //     this.lastSelectedProject = project;
  //   }
  // }


    // this.selectedProject = new Project();
    // console.log(this.selectedProject);

  //
  // selectProjectByIndex(index: number){
  //   if (index - 1 >= 0) {
  //     this.selectedProject = this.projects[index - 1];
  //     this.lastSelectedProject = this.projects[index - 1];
  //   } else if (this.projects.length > 0) {
  //     let last = this.projects.length -1;
  //     this.selectedProject = this.projects[last];
  //     this.lastSelectedProject = this.projects[last];
  //   } else {
  //     this.selectedProject = null;
  //     this.lastSelectedProject = null;
  //   }
  // }
}
