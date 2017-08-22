/**
 * Created by Seppo on 21/08/2017.
 */

import {Component, Inject} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  templateUrl: './login.component.html',
  selector: 'login'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(@Inject(FormBuilder) fb: FormBuilder) {

    this.loginForm = fb.group({
      'username': ['', [Validators.required, Validators.minLength(6)]],
      'password': ['', Validators.minLength(8)],
    });
  }

  submit(){
    console.log(this.loginForm.value);
  }

  get username() {return this.loginForm.get('username');}
  get password() {return this.loginForm.get('password');}

}
