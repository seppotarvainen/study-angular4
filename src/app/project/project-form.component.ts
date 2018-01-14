/**
 * Created by Seppo on 19/07/2017.
 */

import {Component, EventEmitter, Input, OnChanges, Output} from "@angular/core";
import Project from "./project";
import {ProjectService} from "./project.service";

@Component({
  templateUrl: "project-form.component.html",
  selector: "project-form"
})
export class ProjectFormComponent implements OnChanges{
  @Input() project: Project;
  @Output() onEditProject: EventEmitter<Project> = new EventEmitter<Project>();
  @Output() onAddProject: EventEmitter<Project> = new EventEmitter<Project>();
  @Output() onDelete: EventEmitter<Project> = new EventEmitter<Project>();
  @Output() onChangeEditStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
  projectCopy: Project;

  isProjectLocked: boolean = false;

  constructor(private projectService: ProjectService) {}

  ngOnChanges(): void {
    this.setProjectCopyToOriginal();
  }

  onClickCancel(): void {
    this.onChangeEditStatus.emit(false);
  }

  onClickSubmit(): void {
    if (this.projectCopy.id) {
      this.projectService.updateProject(this.projectCopy).then(response => {
        this.onEditProject.emit(response);
      });
    } else {
      this.projectService.addProject(this.projectCopy).then(response => {
        this.onAddProject.emit(response);
        }
      )
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
      this.projectCopy = Object.assign(this.project) as Project;
    } else {
      this.projectCopy = new Project();
    }
  }
}
