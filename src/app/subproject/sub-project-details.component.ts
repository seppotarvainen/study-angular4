import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import SubProject from "./sub-project";
import Recording from "../timer/recording";
import {ProjectService} from "../project/project.service";
import ChecklistItem from "../checklist/checklist-item";
/**
 * Created by Seppo on 06/09/2017.
 */

@Component({
  selector: 'sub-project-details',
  templateUrl: 'sub-project-details.component.html',
  styles: [`
   .pointer {
     cursor: pointer;
   } 
  `]
})
export class SubProjectDetailsComponent implements OnInit{

  @Input() subProject: SubProject;
  @Input() projectId: number;
  @Input() selected: boolean = false;
  @Output() updateSubProject: EventEmitter<SubProject> = new EventEmitter();
  @Output() clickEditSubProject: EventEmitter<SubProject> = new EventEmitter();
  @Output() clickDeleteSubProject: EventEmitter<SubProject> = new EventEmitter();
  @Output() toggleSubProjectInfo: EventEmitter<SubProject> = new EventEmitter();

  checklist: ChecklistItem[];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.checklist = this.subProject.checklistItems;
  }

  createRecording(recording: Recording) {
    this.projectService.createRecording(this.projectId, this.subProject.id, recording)
      .then(rec => {
        this.subProject.recordings.push(rec);
        this.updateSubProject.emit(this.subProject);
      });
  }

  toggleInfo() {
    this.toggleSubProjectInfo.emit(this.subProject);
  }

  clickTimer(running) {
    if (running && !this.selected) this.toggleSubProjectInfo.emit(this.subProject);
  }

}
