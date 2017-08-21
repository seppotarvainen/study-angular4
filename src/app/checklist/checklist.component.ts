
import {Component, EventEmitter, Input, Output} from "@angular/core";
import ChecklistItem from "./checklist-item";
import Project from "../project/project";
import {ProjectService} from "../project/project.service";


@Component({
  templateUrl: "./checklist.component.html",
  selector: "checklist"
})
export class ChecklistComponent {
  @Input() project: Project;
  @Output() onUpdateProject = new EventEmitter<Project>();
  isEditMode: boolean = false;
  item: string;

  checklistForm;

  constructor(private projectService: ProjectService) {}

  getDoneItems(items: ChecklistItem[]): number{
    return items.filter(item => item.done).length;
  }

  addChecklistItem(item: ChecklistItem): void{
    this.projectService.addChecklistItem(this.project.id, item).then(
      response => {
        this.project.checklist.push(response);
        this.onUpdateProject.emit(this.project);
        this.item = null;
      }
    )
  }

  clickCreateTask(): void {
    this.addChecklistItem(new ChecklistItem(this.item));
  }

  clickAddNewTask(): void {
    this.isEditMode = true;
  }

  clickCancel(): void {
    this.isEditMode = false;
  }

  setChecklistItemDone(item: ChecklistItem, value: boolean): void {
    item.done = value;
    this.projectService.editChecklistItem(this.project.id, item).then(
      response => {
        let index = this.project.checklist.findIndex(i => i.id === item.id);
        this.project.checklist[index] = item;
        this.onUpdateProject.emit(this.project);
      }
    );
  }

  clickRemoveDoneTasks() {
    this.projectService.deleteCompletedItems(this.project.id).then(
      response => {
        this.project.checklist = this.project.checklist.filter(p => !p.done);
        this.onUpdateProject.emit(this.project);
      }
    )
  }
}
