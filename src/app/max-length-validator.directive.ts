import {Directive, Input, OnInit} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, Validator, Validators} from "@angular/forms";

@Directive({
  selector: '[maximumLength][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: MaxLenghtValidatorDirective, multi: true}]
})
export class MaxLenghtValidatorDirective implements Validator, OnInit {
  @Input() maximumLength: string;
  private valFn = Validators.nullValidator;

  ngOnInit(): void {
    if (this.maximumLength) {
      this.valFn = Validators.maxLength(Number.parseInt(this.maximumLength));
    } else {
      this.valFn = Validators.nullValidator;
    }
  }

  validate(control: AbstractControl): {[key: string]: any} {
    return this.valFn(control);
  }
}
