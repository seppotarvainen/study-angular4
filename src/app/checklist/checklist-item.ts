/**
 * Created by tarva on 14.1.2018.
 */

export class ChecklistItem {
  id: number;
  content: string;
  done: boolean;

  constructor(content = "") {
    this.content = content;
    this.done = false;
  }
}
