import Project from "./project";
import {ProjectService} from "./project.service";
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {ProjectFormEvent} from "../utils/project-form-event";
/**
 * Created by tarva on 15.11.2017.
 */

@Component({
  templateUrl: "./project-view.component.html",
  selector: "project-view",
})
export class ProjectViewComponent {
  @Input() project: Project;
  @Output() onChangeEditStatus: EventEmitter<ProjectFormEvent> = new EventEmitter<ProjectFormEvent>();
  locked: boolean;

  constructor(private projectService: ProjectService) {
    this.projectService.lock$.subscribe(state => this.locked = state);
  }

  updateTime(newTime: number): void {
    this.project.timeInSeconds = newTime;

    this.projectService.updateProject(this.project).then(response => {
      this.project = response;
    });
  }

  toggleProjectDone(): void {
    this.project.done = !this.project.done;

    this.projectService.updateProject(this.project).then(response => {
      this.project = response;
    });
  }

  onClickDelete(): void {
    this.projectService.deleteProject(this.project);
  }

  onClickEditProject(): void {
    this.onChangeEditStatus.emit(new ProjectFormEvent(this.project, true));
  }

}
