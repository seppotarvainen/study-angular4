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

  constructor() {
    this.title = "";
    this.description = "";
    this.timeInSeconds = 0;
  };
}
