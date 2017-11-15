import ChecklistItem from "../checklist/checklist-item";
import SubProject from "../subproject/sub-project";
import {UserInfo} from "../utils/request-objects";
/**
 * Created by Seppo on 19/07/2017.
 */

/**
 * Project data object
 */
export default class Project {
  id?: number;
  title: string;
  description: string;
  // timeInSeconds: number;
  done: boolean;
  subProjects: SubProject[];
  users: UserInfo[];
  // checklist: ChecklistItem[];

  constructor() {
    this.title = "";
    this.description = "";
    // this.timeInSeconds = 0;
    this.done = false;
    this.subProjects = [];
    // this.checklist = [];
  };
}

export class ProjectFormData {
  id?: number;
  title: string;
  description: string;
}
