/**
 * Created by Seppo on 19/07/2017.
 */

import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from "@angular/core";
import Project from "./project";
import {ProjectService} from "./project.service";
import ChecklistItem from "../checklist/checklist-item";
import {ActivatedRoute, Router, ParamMap} from "@angular/router";
import "rxjs/add/operator/switchMap";

@Component({
  templateUrl: "./project-details.component.html",
  selector: "project-details"
})
export class ProjectDetailsComponent implements OnInit{
  // @Input() project: Project;
  @Output() onEditProject: EventEmitter<Project> = new EventEmitter<Project>();
  project: Project;

  isProjectLocked: boolean = false;

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private router: Router) {}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.hasOwnProperty('id')){
        this.projectService.getProject(+params['id']).then(
          p => {
            this.project = p;
            console.log(p);
          }
        )
      } else {
        this.project = null;
      }
    })
  }

  // lockProject(value: boolean): void {
  //   this.projectService.setLocked(value);
  // }

  public onClickEdit(): void {
    if (this.projectService.getLocked()) return;
    this.projectService.setLocked(true);

    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onClickDelete(): void {
    if (this.projectService.getLocked()) return;

    this.projectService.deleteProject(this.project).then(() => {
      this.router.navigate(['projects']);
    })
  }

  onClickMarkAsDone(event: boolean): void {
    let copy = this.getProjectCopy();
    copy.done = event;
    this.projectService.updateProject(copy).then(response => {
      this.project.done = response.done;
    });
  }

  updateTime(newTime: number): void {
    let copy = this.getProjectCopy();
    // copy.timeInSeconds = newTime;
    //
    // this.projectService.updateProject(copy).then(response => {
    //   this.project.timeInSeconds = response.timeInSeconds;
    // });
  }

  private getProjectCopy(): Project {
    return Object.assign(this.project);
  }
}
