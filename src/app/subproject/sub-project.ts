import ChecklistItem from "../checklist/checklist-item";
import Recording from "../timer/recording";
/**
 * Created by Seppo on 31/08/2017.
 */

export default class SubProject {
  id?: number;
  title: string = "";
  comment: string = "";
  checklistItems: ChecklistItem[] = [];
  recordings: Recording[] = [];
}

export class SubProjectFormData {
  id?: number;
  title: string;
  comment: string;
}
