import Project from "../project/project";
/**
 * Created by tarva on 14.1.2018.
 */

export class ProjectFormEvent {
  projectToSelect: Project;
  editStatus: boolean;

  constructor(projectToSelect = null, editStatus = false) {
    this.projectToSelect = projectToSelect;
    this.editStatus = editStatus;
  }
}
