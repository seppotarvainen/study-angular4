import {AbstractControl, ValidatorFn} from "@angular/forms";
/**
 * Created by Seppo on 21/08/2017.
 */

export function regexValidator(regex: RegExp): ValidatorFn {
          //param  paramType          return type
  return (control: AbstractControl): {[key: string]: any} => {
    const forbidden = !regex.test(control.value);
    return forbidden ? {'regexValidator': {value: control.value}} : null;
  }
}

export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value;
    let mpassword = AC.get('mpassword');
    if(password !== mpassword.value) {
      mpassword.setErrors( {mpassword: true} );
    } else {
      mpassword.setErrors(null);
    }
  }
}





