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
    let copy = Object.assign(this.project) as Project;
    copy.timeInSeconds = newTime;

    this.projectService.updateProject(copy).then(response => {
      this.project.timeInSeconds = response.timeInSeconds;
    });
  }

  onClickDelete(): void {
    this.projectService.deleteProject(this.project);
  }

}
