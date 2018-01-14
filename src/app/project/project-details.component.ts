import {Component, Input, EventEmitter, Output} from "@angular/core";
import Project from "./project";
import {ProjectFormEvent} from "../utils/project-form-event";
/**
 * Created by tarva on 15.11.2017.
 */

@Component({
  template: `
    <project-form *ngIf='isEditMode' [project]="project" (onChangeEditStatus)="changeEditStatus($event)"></project-form>
    <project-view *ngIf='!isEditMode' [project]="project" (onChangeEditStatus)="changeEditStatus($event)"></project-view>
  `,
  selector: "project-details",
})
export class ProjectDetailsComponent {

  @Input() isEditMode: boolean;
  @Input() project: Project;
  @Output() onChangeEditStatus: EventEmitter<ProjectFormEvent> = new EventEmitter<ProjectFormEvent>();

  changeEditStatus(event: ProjectFormEvent) {
    this.onChangeEditStatus.emit(event);
  }
}
