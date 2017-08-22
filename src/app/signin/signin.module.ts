/**
 * Created by Seppo on 21/08/2017.
 */

import {NgModule} from "@angular/core";
import {RegistrationComponent} from "./registration.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {FormInput} from "./form-input";
import {LoginComponent} from "./login.component";
import {AppRoutingModule} from "../app-routing.module";

@NgModule({
  declarations: [RegistrationComponent, LoginComponent, FormInput],
  imports: [CommonModule, ReactiveFormsModule, AppRoutingModule]
})
export class SigninModule {}
