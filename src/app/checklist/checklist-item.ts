/**
 * Created by Seppo on 19/07/2017.
 */

/**
 * Checklist item data object
 */
export default class ChecklistItem {
  id?: number;
  content: string;
  done: boolean;

  constructor(content: string) {
    this.content = content;
    this.done = false;
  }
}
