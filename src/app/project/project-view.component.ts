import Project from "./project";
import {ProjectService} from "./project.service";
import {Component, Input} from "@angular/core";
/**
 * Created by tarva on 15.11.2017.
 */

@Component({
  templateUrl: "./project-view.component.html",
  selector: "project-view",
})
export class ProjectViewComponent {
  @Input() project: Project;

  constructor(private projectService: ProjectService) {}

  updateTime(newTime: number): void {
    this.project.timeInSeconds = newTime;

    this.projectService.updateProject(this.project).then(response => {
      this.project.timeInSeconds = response.timeInSeconds;
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

}
