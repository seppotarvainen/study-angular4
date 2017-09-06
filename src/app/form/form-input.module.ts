/**
 * Created by Seppo on 25/08/2017.
 */

import {NgModule} from "@angular/core";
import {FormInput} from "./form-input.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {Autofocus} from "./autofocus.directive";

@NgModule({
  declarations: [
    FormInput,
    Autofocus
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormInput,
  ]
})
export class FormInputModule {}
