import {Component, Inject} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordValidation, regexValidator} from "../form/validators";
import {SignInService} from "./signin.service";
import {UserRegistration} from "../utils/request-objects";
import {Router} from "@angular/router";
/**
 * Created by Seppo on 21/08/2017.
 */

// username: at least 6 chars, only [a-z, A-Z, 0-9, .@!#$%&'*+-/=?^_`{|}~]
// email: [something]@[something].[something] (missing @ / that doesn't seem to be a valid email address)
// password: not null, 8 chars, least 2 numbers
// matching password: matches password field

@Component({
  templateUrl: "./registration.component.html",
  selector: "registration",
})
export class RegistrationComponent {

  registerForm: FormGroup;
  errorMessages: {username: object, email: object, password: object, mpassword: object};
  user: UserRegistration;

  constructor(@Inject(FormBuilder) fb: FormBuilder, private signInService: SignInService, private router: Router) {
    this.user = new UserRegistration();
    this.registerForm = fb.group({
      'username': [this.user.username, [Validators.required, Validators.minLength(6)]],
      'email': [this.user.email, [Validators.required, regexValidator(/[^@]+@[a-z.]+\.[a-z]+/)]],
      'password': [this.user.password, [Validators.required,Validators.minLength(8)]],
      'mpassword': ['', Validators.minLength(8)],
    }, {
      validator: PasswordValidation.MatchPassword
    }); // async validator -> user already exists

    this.errorMessages = {
      username: {required: "Username is required.", minlength: "Username should be at least 6 characters."},
      email: {required: "Email is required.", regexValidator: "Provide a valid email address."},
      password: {required: "Password is required.", minlength: "Password should be at least 8 characters"},
      mpassword: {minlength: 'Password should be at least 8 characters', mpassword: 'Passwords don\'t match'}
    };
  }

  submit(){
    if (this.registerForm.invalid) return;

    let newUser = new UserRegistration();
    newUser.setUser(this.registerForm.value);

    this.signInService.register(newUser).then(resp => {
      console.log(resp);
      this.router.navigate(['login']);
    });
  }

  getErrorMessage(key: string): object {
    return this.errorMessages[key];
  }

  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get mpassword() { return this.registerForm.get('mpassword'); }
}
