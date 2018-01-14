/**
 * Created by Seppo on 19/07/2017.
 */

/**
 * Project data object
 */
export default class Project {
  id: number;
  title: string;
  description: string;
  timeInSeconds: number;
  done: boolean;

  constructor() {
    this.title = "";
    this.description = "";
    this.timeInSeconds = 0;
    this.done = false;
  };
}
