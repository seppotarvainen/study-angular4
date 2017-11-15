import {Component, EventEmitter, Input, Output} from "@angular/core";
import ChecklistItem from "./checklist-item";
import {ProjectService} from "../project/project.service";


@Component({
  templateUrl: "./checklist.component.html",
  selector: "checklist"
})
export class ChecklistComponent {

  @Input() checklist: ChecklistItem[];
  @Input() projectId: number;
  @Input() subProjectId: number;
  @Output() onAddChecklistItem = new EventEmitter<ChecklistItem>();
  isEditMode: boolean = false;
  item: string;

  constructor(private projectService: ProjectService) {}

  getDoneItems(items: ChecklistItem[]): number{
    if (items) return items.filter(item => item.done).length;
  }

  addChecklistItem(item: ChecklistItem): void{
    if (!item.content || item.content.length === 0) {
      this.isEditMode = false;
      return;
    }

    this.onAddChecklistItem.emit(item);

    this.projectService.addChecklistItem(this.projectId, this.subProjectId, item).then(response => {
        this.checklist.push(response);
        this.item = null;
      }
    );
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
    this.projectService.editChecklistItem(this.projectId, this.subProjectId, item).then(
      response => {
        let index = this.checklist.findIndex(i => i.id === item.id);
        this.checklist[index] = response;
      }
    );
  }

  clickRemoveDoneTasks() {
    this.projectService.deleteCompletedItems(this.projectId, this.subProjectId).then(
      response => {
        if (response === null) {
          this.checklist = this.checklist.filter(item => !item.done);
        }
      }
    )
  }
}
