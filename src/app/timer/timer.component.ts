/**
 * Created by Seppo on 19/07/2017.
 */

import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  templateUrl: "./timer.component.html",
  selector: "timer"
})
export class TimerComponent{
  @Input() time: number;
  @Output() onUpdateTime = new EventEmitter<number>();

  currentTime: number = 0;
  running: boolean = false;

  timer = null;

  constructor() {
    this.currentTime = 0;
    this.tick = this.tick.bind(this);
  }

  toggleTimer(event): void {
    this.running = !this.running;
    if (this.running) {
      this.timer = setInterval(
        this.tick,
        1000
      );
    } else {
      this.time += this.currentTime;
      this.currentTime = 0;
      clearInterval(this.timer);
      this.onUpdateTime.emit(this.time);
    }
  }

  tick(): void {
    this.currentTime += 1;
  }

  getTime(seconds:number): string {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds / 60) % 60);
    let s = seconds % 60;

    return h+"h "+m+"min "+s+ "s";
  }


}
