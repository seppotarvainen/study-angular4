import SubProject, {SubProjectFormData} from "./sub-project";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Component, EventEmitter, Inject, Input, OnInit, Output} from "@angular/core";
import {ProjectService} from "../project/project.service";
/**
 * Created by Seppo on 31/08/2017.
 */

@Component({
  selector: "sub-project-form",
  templateUrl: "sub-project-form.component.html"
})
export class SubProjectFormComponent implements OnInit{

  @Output() submitForm = new EventEmitter<SubProject>();
  @Output() cancelForm = new EventEmitter<boolean>();
  @Input() subProject: SubProject;
  @Input() projectId: number;
  subProjectForm: FormGroup;
  errorMessages: {title: object, comment: object};

  constructor(@Inject(FormBuilder) fb: FormBuilder, private projectService: ProjectService) {

    this.subProjectForm = fb.group({
      'title': ['', [Validators.required, Validators.maxLength(64)]],
      'comment': ['', Validators.maxLength(128)],
    });

    this.errorMessages = {
      title: {required: "Title is required", maxlength: "Title length should be under 64 characters long."},
      comment: {maxlength: "Comment should be under 128 characters long."}
    }
  }

  getErrorMessage(key: string): object {
    return this.errorMessages[key];
  }

  ngOnInit(): void {
    console.log(this.subProject);
    console.log(this.projectId);
    if (this.subProject.id) {
      console.log("ID FOUND");
      let subProjectData = new SubProjectFormData();

      subProjectData.title = this.subProject.title;
      subProjectData.comment = this.subProject.comment;
      this.subProjectForm.setValue(subProjectData);
    }
  }

  cancel(): void {
    this.cancelForm.emit(false);
  }

  submit(): void {
    if (this.subProjectForm.invalid) return;

    let data: SubProject = Object.assign(this.subProjectForm.value);
    if (this.subProject.id) {
      data.id = this.subProject.id;
      this.projectService.updateSubProject(this.projectId, data).then(response => {
        console.log("SUB PROJECT EDITED");
        console.log(response);
        this.submitForm.emit(response);
      });
    } else {
      console.log("Adding...");
      this.projectService.addSubProject(this.projectId, data).then(response => {
        console.log("SUB PROJECT ADDED");
        console.log(response);
        this.submitForm.emit(response);
      });
    }


    console.log(data);
  }

  get title() {return this.subProjectForm.get('title');}
  get comment() {return this.subProjectForm.get('comment');}

}
