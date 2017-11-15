import {Directive, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2} from "@angular/core";
import {ProjectService} from "../project/project.service";
/**
 * Created by Seppo on 29/08/2017.
 */

@Directive({
  selector: '[myLock]'
})
export class Lock implements OnInit, OnChanges {

  @Input() isLocked: boolean = false;

  constructor(private el: ElementRef, private projectService: ProjectService) {}

  ngOnInit(): void {
    if (this.isLocked) {
      this.setStyle(true);
      return;
    }

    this.projectService.lock$.subscribe(value => {
      this.setStyle(value);
    });
  }

  ngOnChanges(): void {
    console.log("Changed");
    console.log(this.isLocked);
    this.setStyle(this.isLocked);
  }


  private setStyle(lockedStatus) {
    if (lockedStatus) {
      this.el.nativeElement.classList.add('disabled');
    } else {
      this.el.nativeElement.classList.remove('disabled');
    }
  }
}
