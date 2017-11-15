/**
 * Created by Seppo on 19/07/2017.
 */

import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {ProjectService} from "../project/project.service";
import Recording from "./recording";
import {isBoolean} from "util";
import {recognize} from "@angular/router/src/recognize";

@Component({
  templateUrl: "./timer.component.html",
  selector: "timer"
})
export class TimerComponent implements OnInit{

  @Input() recordings: Recording[];
  @Input() subProjectId: number;
  @Output() onUpdateTime = new EventEmitter<Recording>();
@Output() onToggleTimer = new EventEmitter<boolean>();

totalTime: number = 0;
currentTime: number = 0;
running: boolean = false;

  timer = null;
  currentRecording: Recording;

  constructor(private projectService: ProjectService) {
    this.tick = this.tick.bind(this);
  }

  ngOnInit(): void {
    this.recordings.sort((a, b) => {
      if (a.start > b.start) return 1;
      else if (a.start < b.start) return -1;
      return 0;
    });
    this.totalTime = this.getRecordingsTotalTime();
  }

  toggleTimer(event): void {
    if (this.projectService.getLocked() && !this.running) return;

    this.running = !this.running;
    if (this.running) {
      this.currentRecording = new Recording();
      this.currentRecording.start = new Date();
      this.timer = setInterval(
        this.tick,
        1000
      );
    } else {
      this.totalTime += this.currentTime;
      this.currentRecording.end = new Date(this.currentRecording.start.getTime() + this.currentTime);
      this.currentTime = 0;
      this.projectService.setRunningCurrentTime(this.currentTime);
      this.onUpdateTime.emit(this.currentRecording);

      clearInterval(this.timer);
    }
    this.onToggleTimer.emit(this.running);
    this.projectService.setLocked(this.running);
  }

  tick(): void {
    this.currentTime += 1;
    this.projectService.setRunningCurrentTime(this.currentTime);
  }

  getRecordingsTotalTime(): number{
    let total = 0;
    if (this.recordings){
      this.recordings.forEach(rec => {
        console.log(rec);
        total += Recording.getDuration(rec.start, rec.end);
      });
    }
    return total;
  }

  getTime(seconds:number): string {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds / 60) % 60);
    let s = seconds % 60;

    return h+"h "+m+"min "+s+ "s";
  }

  getLatestRecording() {
    if (this.recordings.length > 0)
      return this.recordings[this.recordings.length -1].start;
  }

  // when running, never show gray
  getLockStatus() {
    if (!this.running) return false;
  }

  // if locked --> show gray
  // when running, never show gray

}
