
import {AfterContentInit, Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import ChecklistItem from "./checklist-item";
import Project from "../project/project";
import {ProjectService} from "../project/project.service";


@Component({
  templateUrl: "./checklist.component.html",
  selector: "checklist"
})
export class ChecklistComponent {

  @Input() checklist: ChecklistItem[];
  @Input() projectId: number;
  @Output() onAddChecklistItem = new EventEmitter<ChecklistItem>();
  isEditMode: boolean = false;
  item: string;

  constructor(private projectService: ProjectService) {}

  getDoneItems(items: ChecklistItem[]): number{
    if (items) return items.filter(item => item.done).length;
  }

  addChecklistItem(item: ChecklistItem): void{
    this.onAddChecklistItem.emit(item);

    this.projectService.addChecklistItem(this.projectId, item).then(response => {
        this.checklist.push(response);
        this.item = null;
      }
    );
  }

  clickCreateTask(): void {
    this.addChecklistItem(new ChecklistItem(this.item));
  }

  clickAddNewTask(): void {
    this.projectService.setLocked(true);
    this.isEditMode = true;
  }

  clickCancel(): void {
    this.projectService.setLocked(false);
    this.isEditMode = false;
  }

  setChecklistItemDone(item: ChecklistItem, value: boolean): void {
    item.done = value;
    this.projectService.editChecklistItem(this.projectId, item).then(
      response => {
        let index = this.checklist.findIndex(i => i.id === item.id);
        this.checklist[index] = response;
      }
    );
  }

  clickRemoveDoneTasks() {
    this.projectService.deleteCompletedItems(this.projectId).then(
      response => {
        if (response === null) {
          this.checklist = this.checklist.filter(item => !item.done);
        }
      }
    )
  }
}
