/**
 * Created by Seppo on 21/08/2017.
 */

import {NgModule} from "@angular/core";
import {RegistrationComponent} from "./registration.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {FormInput} from "../form/form-input.component";
import {LoginComponent} from "./login.component";
import {AppRoutingModule} from "../app-routing.module";
import {SignInService} from "./signin.service";
import {FormInputModule} from "../form/form-input.module";

@NgModule({
  declarations: [
    RegistrationComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormInputModule,
    ReactiveFormsModule,
  ],
  providers: [SignInService]
})
export class SigninModule {}
