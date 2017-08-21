/**
 * Created by Seppo on 21/08/2017.
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'duration'})
export class DurationPipe implements PipeTransform {

  /**
   * Transform number of seconds to duration hh:mm:ss.
   * @param value - number of seconds
   * @returns {string} - duraton in format hh:mm:ss
   */
  transform(value: number): string {

    let h = Math.floor(value / 3600);
    let m = Math.floor((value / 60) % 60);
    let s = value % 60;

    return h+"h "+m+"min "+s+ "s";
  }
}
