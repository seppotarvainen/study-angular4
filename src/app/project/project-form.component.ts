import {Component, Inject, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "./project.service";
import {Location} from "@angular/common";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Project from "./project";
/**
 * Created by Seppo on 24/08/2017.
 */

@Component({
  templateUrl: "./project-form.component.html",
  selector: "project-form"
})
export class ProjectFormComponent implements OnInit {

  project: Project;
  projectForm: FormGroup;

  constructor(@Inject(FormBuilder) fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private projectService: ProjectService,
              private location: Location) {

    this.projectForm = fb.group({
      'title': ['', Validators.required],
      'description': ['', Validators.maxLength(256)],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        if (params.hasOwnProperty('id')){
          this.projectService.getProject(+params['id'])
            .then(project => {
              let projectToEdit = {
                title: project.title,
                description: project.description
              };

              this.project = project;
              this.projectForm.setValue(projectToEdit);
            });
        } else {
          this.project = new Project();
        }
      }
    );
  }

  showProjectHeading(): string {
    if (this.title.value.length > 0) {
      return this.title.value;
    }
    return "Project title";
  }

  clickCancel(): void {
    this.projectService.setLocked(false);
    this.location.back();
  }

  submit(): void {
    if (this.projectForm.invalid) return;

    let projectToEdit = Object.assign(this.projectForm.value);

    if (this.project.id){
      projectToEdit['id'] = this.project.id;
      this.projectService.updateProject(projectToEdit).then(proj => this.router.navigate(['projects', proj.id]));
    } else {
      this.projectService.addProject(projectToEdit).then(proj => this.router.navigate(['projects', proj.id]));
    }
    this.projectService.setLocked(false);
  }

  get title() {return this.projectForm.get('title');}
  get description() {return this.projectForm.get('description');}

}
