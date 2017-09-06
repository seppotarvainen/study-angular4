import {Component, Input, OnInit} from "@angular/core";
import SubProject from "./sub-project";
import {ProjectService} from "../project/project.service";
import Recording from "../timer/recording";
/**
 * Created by Seppo on 31/08/2017.
 */


@Component({
  selector: "sub-projects",
  templateUrl: "sub-project.component.html",
  styles: [`
    .add-padding {
      padding-left:0.6em;
    }
    .sub-projects > div {
      padding: 0.25em 0.5em;
      cursor: pointer;
    }

    .sub-projects > div:nth-child(even) {
      background: #f5f5f5;
    }

    .sub-projects > div:hover {
      background: #d9edf7;
    }
  `],
})
export class SubProjectComponent implements OnInit{
  @Input() subProjects: SubProject[];
  @Input() projectId: number;
  formView: boolean = false;
  selectedSubProject: SubProject;

  sortingOptions: string[] = ["Name", "Latest", "Length"];
  private compareFunction: (subA: SubProject, subB: SubProject) => number = this.sortByTitle;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.sortSubProjects();
  }

  onFormCancel(cancelStatus: boolean): void {
    this.formView = cancelStatus;
    this.projectService.setLocked(cancelStatus);
  }

  sortByTitle(a: SubProject, b: SubProject): number {
    let subTitleA = a.title.toUpperCase();
    let subTitleB = b.title.toUpperCase();
    if (subTitleA > subTitleB) return 1;
    else if (subTitleA < subTitleB) return -1;
    return 0;
  }

  private sortByLength(a: SubProject, b: SubProject): number {
    let subProjectTotalTimeA = this.getSubProjectTotalTime(a);
    let subProjectTotalTimeB = this.getSubProjectTotalTime(b);
    if (subProjectTotalTimeA < subProjectTotalTimeB) return 1;
    else if (subProjectTotalTimeA > subProjectTotalTimeB) return -1;
    return 0;
  }

  private sortByLatest(a: SubProject, b: SubProject): number {
    let subProjectLatestA = this.getSubProjectLatest(a);
    let subProjectLatestB = this.getSubProjectLatest(b);
    if (subProjectLatestA < subProjectLatestB) return 1;
    else if (subProjectLatestA > subProjectLatestB) return -1;
    return 0;
  }

  setOrdering(event: string){
    switch (event) {
      case "Name":
        this.compareFunction = this.sortByTitle;
        break;
      case "Latest":
        this.compareFunction = this.sortByLatest;
        break;
      case "Length":
        this.compareFunction = this.sortByLength;
        break;
    }
    this.sortSubProjects();
  }

  onFormSubmit(subProject: SubProject) {
    let index = this.subProjects.findIndex(sub => sub.id === subProject.id);
    if (index < 0) {
      this.subProjects.push(subProject);
    } else {
      this.subProjects[index] = subProject;
    }
    this.formView = false;
    this.projectService.setLocked(false);
    this.sortSubProjects();
  }

  onClickAddSubProject() {
    this.formView = true;
    this.selectedSubProject = new SubProject();
    this.projectService.setLocked(true);
  }

  onClickEditSubProject(subProject: SubProject) {
    this.selectedSubProject = subProject;
    this.formView = true;
    this.projectService.setLocked(true);
  }

  onClickDeleteSubProject(subProject: SubProject) {
    this.projectService.deleteSubProject(this.projectId, subProject)
      .then(() => {
        this.subProjects = this.subProjects.filter(sub => sub.id !== subProject.id);
      });
  }

  createRecording(event: {recording: Recording, subProjectId: number}) {
    this.projectService.createRecording(this.projectId, event.subProjectId, event.recording)
      .then(rec => {
        this.subProjects.find(s => s.id === event.subProjectId).recordings.push(rec);
        this.sortSubProjects();
      });
  }

  sortSubProjects(): void {
    this.subProjects.sort((a, b) => this.compareFunction(a, b))
  }

  getProjectTotalTime(){
    let total = 0;
    this.subProjects.forEach(s => {
      total += this.getSubProjectTotalTime(s);
    });
    total += this.projectService.getRunningCurrentTime();
    return total;
  }

  getSubProjectTotalTime(subProject: SubProject): number {
    let total = 0;
    subProject.recordings.forEach(r => {
      total += Recording.getDuration(r.start, r.end);
    });
    return total;
  }

  getSubProjectLatest(subProject: SubProject): number{
    let max = 0;
    subProject.recordings.forEach(rec => {
      let time = new Date(rec.start).getTime();
      if (time > max) max = time;
    });
    return max;
    // return 1;
  }

  toggleTimer(){

  }

  setSelectedSubProject(subProject: SubProject) {
    this.selectedSubProject = subProject;
  }
}

enum SortingOption {
  Name,
  Latest,
  Length,
}
