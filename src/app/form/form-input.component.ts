/**
 * Created by Seppo on 22/08/2017.
 */

import {Component, Input} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  templateUrl: "./form-input.component.html",
  selector: "form-input",
  styleUrls: ["./validatorstyle.css"],
})
export class FormInput   {

  @Input() type: string = "text";
  @Input() label: string;
  @Input() inputId: string;
  @Input() errorMessages: object = {};
  @Input() field: FormControl;
  @Input() group: FormGroup;
  @Input() isFocused?: boolean;

  validateField() {
    return this.field.dirty && this.field.invalid;
  }

  getErrors(errors){
    return Object.keys(errors);
  }

}
