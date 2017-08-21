
import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ProjectService} from "./project.service";
import Project from "./project";


@Component({
  templateUrl: "./project-list.component.html",
  selector: "project-list",
})
export class ProjectListComponent {
  @Input() projects: Project[];
  @Input() selectedProject: Project;
  @Output() onSelectProject: EventEmitter<Project> = new EventEmitter<Project>();

  onSelect(project: Project): void {
    this.onSelectProject.emit(project);
  }
}
