import {Directive, ElementRef, Input, OnInit, Renderer2} from "@angular/core";
import {ProjectService} from "../project/project.service";
/**
 * Created by Seppo on 29/08/2017.
 */

@Directive({
  selector: '[myLock]'
})
export class Lock {
  @Input('myAutofocus') isFocus?: boolean;

  constructor(private el: ElementRef, private projectService: ProjectService) {
    this.projectService.lock$.subscribe(value => {
      if (value) {
        this.el.nativeElement.classList.add('disabled');
      } else {
        this.el.nativeElement.classList.remove('disabled');
      }
    });
  }
}
