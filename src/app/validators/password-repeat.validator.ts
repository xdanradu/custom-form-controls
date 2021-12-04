import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import {Password} from '../const/password.enum';

export const passwordRepeat: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const newPassword = control.get(Password.NEW);
  const repeatPassword = control.get(Password.REPEAT);
  if (newPassword && repeatPassword &&
    newPassword.value !== null && repeatPassword.value !== null &&
    newPassword.value !== repeatPassword.value
    ) {
    repeatPassword.setErrors({ ...repeatPassword.errors, noMatch: true });
  }
  return null;
};
