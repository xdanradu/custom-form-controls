import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordRepeat: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const newPassword = control.get('newPassword');
  const repeatPassword = control.get('repeatPassword');
  if (newPassword &&
    repeatPassword &&
    newPassword.value !== repeatPassword.value &&
    newPassword.value !== null && repeatPassword.value !== null
    ) {
    repeatPassword.setErrors({ ...repeatPassword.errors, noMatch: true });
  }
  return null;
};