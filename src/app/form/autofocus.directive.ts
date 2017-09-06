/**
 * Created by Seppo on 28/08/2017.
 */

import {Directive, ElementRef, Input, OnInit, Renderer, Renderer2} from "@angular/core";
import {selector} from "rxjs/operator/multicast";

@Directive({
  selector: '[myAutofocus]'
})
export class Autofocus implements OnInit{
  @Input('myAutofocus') isFocus?: boolean;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    if (this.isFocus) this.el.nativeElement.focus();
  }

}
