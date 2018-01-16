import {Component, Input} from "@angular/core";
import {ChecklistItem} from "./checklist-item";
import {ProjectService} from "../project/project.service";
import Project from "../project/project";

/**
 * Created by tarva on 14.1.2018.
 */

@Component({
  templateUrl: "./checklist-view.component.html",
  selector: "checklist",
})
export class ChecklistViewComponent {
  @Input() checklist: ChecklistItem[];
  @Input() project: Project;

  isEditMode = false;
  newContent = "";

  constructor(private projectService: ProjectService) {}

  submitForm(event) {
    const item = new ChecklistItem(this.newContent);
    this.newContent = "";
    this.isEditMode = false;
    this.projectService.addChecklistItemToProject(item, this.project);
  }

  clickAddItem() {
    this.isEditMode = true;
  }

  clickCancel() {
    this.newContent = "";
    this.isEditMode = false;
  }

}
