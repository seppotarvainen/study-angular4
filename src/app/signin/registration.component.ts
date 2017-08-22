import {Component, Inject} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordValidation, regexValidator} from "./validators";
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

  constructor(@Inject(FormBuilder) fb: FormBuilder) {

    this.registerForm = fb.group({
      'username': ['', [Validators.required, Validators.minLength(6)]],
      'email': ['', [Validators.required, regexValidator(/[^@]+@[a-z.]+\.[a-z]+/)]],
      'password': ['', Validators.minLength(8)],
      'mpassword': ['', Validators.minLength(8)]
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

  // validate(field: FormControl): boolean{
  //   return field.invalid && (field.dirty || field.touched);
  // }

  submit(){
    console.log(this.registerForm.value);
  }

  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get mpassword() { return this.registerForm.get('mpassword'); }
}
