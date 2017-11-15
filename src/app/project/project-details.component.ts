/**
 * Created by Seppo on 19/07/2017.
 */

import {Component, EventEmitter, Input, OnChanges, Output} from "@angular/core";
import Project from "./project";
import {ProjectService} from "./project.service";

@Component({
  templateUrl: "./project-details.component.html",
  selector: "project-details"
})
export class ProjectDetailsComponent implements OnChanges{
  @Input() project: Project;
  @Input() isEditMode: boolean;
  @Output() onEditProject: EventEmitter<Project> = new EventEmitter<Project>();
  @Output() onAddProject: EventEmitter<Project> = new EventEmitter<Project>();
  @Output() onDelete: EventEmitter<Project> = new EventEmitter<Project>();
  @Output() onChangeEditStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
  projectCopy: Project;

  name: string = '';
  isProjectLocked: boolean = false;

  constructor(private projectService: ProjectService) {}

  public onClickEdit(): void {
    if (this.isProjectLocked) return;

    this.setProjectCopyToOriginal();
    this.onChangeEditStatus.emit(true);
  }

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

  onClickDelete(): void {
    if (this.isProjectLocked) return;

    this.projectService.deleteProject(this.project).then(() => {
      this.onDelete.emit(this.project);
    })
  }

  showProjectHeading(): string {
    if (this.projectCopy && this.projectCopy.title.length > 0) {
      return this.projectCopy.title;
    }
    return "Project title";
  }

  updateTime(newTime: number): void {
    let copy = Object.assign(this.project) as Project;
    copy.timeInSeconds = newTime;

    this.projectService.updateProject(copy).then(response => {
      this.project.timeInSeconds = response.timeInSeconds;
    });
  }

  private setProjectCopyToOriginal(): void {
    if (this.project) {
      this.projectCopy = Object.assign(this.project) as Project;
    } else {
      this.projectCopy = new Project();
    }
  }
}
