/**
 * Created by Seppo on 19/07/2017.
 */

import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import Project from "./project";
import {ProjectService} from "./project.service";
import {ProjectFormEvent} from "../utils/project-form-event";

@Component({
  templateUrl: "project-form.component.html",
  selector: "project-form"
})
export class ProjectFormComponent implements OnInit{
  @Input() project: Project;
  @Output() onChangeEditStatus: EventEmitter<ProjectFormEvent> = new EventEmitter<ProjectFormEvent>();
  projectCopy: Project;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.setProjectCopyToOriginal();
  }

  onClickCancel(): void {
    if (this.project.id) {
      this.onChangeEditStatus.emit(new ProjectFormEvent(this.project))
    } else {
      this.onChangeEditStatus.emit(new ProjectFormEvent());
    }
  }

  onClickSubmit(): void {
    if (this.project.id) {
      this.projectService.updateProject(this.projectCopy);
    } else {
      this.projectService.addProject(this.projectCopy);
    }
  }

  showProjectHeading(): string {
    if (this.projectCopy && this.projectCopy.title.length > 0) {
      return this.projectCopy.title;
    }
    return "Untitled project";
  }

  private setProjectCopyToOriginal(): void {
    if (this.project) {
      this.projectCopy = JSON.parse(JSON.stringify(this.project));
    } else {
      this.projectCopy = new Project();
    }
  }
}
