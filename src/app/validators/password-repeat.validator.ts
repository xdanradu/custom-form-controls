import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import {Password} from '../const/password.enum';

export const passwordRepeat: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const newPasswordWrapper = control.get(Password.NEW_WRAPPER);
  const repeatPassword = control.get(Password.REPEAT);
  if (newPasswordWrapper && newPasswordWrapper.value &&
    repeatPassword &&
    newPasswordWrapper.value.newPassword !== repeatPassword.value &&
    newPasswordWrapper.value.newPassword !== null && repeatPassword.value !== null
    ) {
    repeatPassword.setErrors({ ...repeatPassword.errors, noMatch: true });
  }
  return null;
};
