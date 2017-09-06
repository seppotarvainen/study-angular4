
import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {ProjectService} from "./project.service";
import Project from "./project";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import "rxjs/add/operator/switchMap";
import {Subscription} from "rxjs/Subscription";


@Component({
  templateUrl: "./project-list.component.html",
  selector: "project-list",
})
export class ProjectListComponent implements OnInit{


  @Input() projects: Project[];
  // @Output() onSelectProject: EventEmitter<Project> = new EventEmitter<Project>();

  private searchTerm: string = "";
  private selectedProjectId: number = -1;
  filteredProjects: Project[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private projectService: ProjectService) {

    this.projectService.projectList$.subscribe(project => {
      if (project) this.handleProjectForm(project);
    });



    this.projectService.projectListDelete$.subscribe(projectId => {
      if (projectId >= 0) this.projects = this.projects.filter(p => p.id !== projectId);
    });
  }

  ngOnInit(): void {
    console.log(this.route);
    this.route.firstChild.params.subscribe(params => {
      if (params.hasOwnProperty('id')){
        this.projectService.getProject(+params['id']).then(
          p => {this.selectedProjectId = p.id}
        )
      }
    })
  }

  onChangeSearchText(input: string) {
    this.searchTerm = input.toUpperCase();
  }

  isSelectedProjectId(projectId: number): boolean {
    return this.selectedProjectId === projectId;
  }

  getFilteredProjects(): Project[] {
    if (!this.projects) return [];

    this.filteredProjects = this.projects.filter(p =>
      p.title.toUpperCase().includes(this.searchTerm) || p.description.toUpperCase().includes(this.searchTerm)
    );
    return this.filteredProjects;
  }

  onSelect(project: Project): void {
    if (this.projectService.getLocked()) return;
    this.selectedProjectId = project.id;
    this.router.navigate(['projects', project.id]);
  }

  handleProjectForm(project) {
    let projectIndex = this.projects.findIndex(proj => proj.id === project.id);

    if (projectIndex >= 0) {
      this.projects[projectIndex] = project;
    } else {
      this.projects.push(project);
    }
  }

  onClickAddProject(): void {
    if (this.projectService.getLocked()) return;

    this.projectService.setLocked(true);
    this.router.navigate(['projects', 'add']);
  }
}
