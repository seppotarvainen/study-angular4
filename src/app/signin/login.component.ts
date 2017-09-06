/**
 * Created by Seppo on 21/08/2017.
 */

import {Component, Inject} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SignInService} from "./signin.service";
import {UserLogin} from "../utils/request-objects";
import {JwtResponse} from "../utils/response-objects";
import {Router} from "@angular/router";
import {FormInput} from "../form/form-input.component";

@Component({
  templateUrl: './login.component.html',
  selector: 'login'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(@Inject(FormBuilder) fb: FormBuilder, private signInService: SignInService, private router: Router) {

    this.loginForm = fb.group({
      'username': ['', [Validators.required, Validators.minLength(6)]],
      'password': ['', Validators.minLength(8)],
    });
  }

  submit(){
    if (this.loginForm.invalid) return;

    let loginUser = new UserLogin();
    loginUser.setUser(this.loginForm.value);
    this.signInService.login(loginUser)
      .then(response => {
        this.signInService.setLoggedInUser(response as JwtResponse);
        this.router.navigate(['projects']);
      });

  }

  get username() {return this.loginForm.get('username');}
  get password() {return this.loginForm.get('password');}

}
