import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { Component } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { isValidRegex } from '../validators/is-valid-regex.validator';
import { passwordRepeat } from '../validators/password-repeat.validator';
import { ValidationRules } from '../validators/validation-rules.enum';

@Component({
  selector: 'new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: NewPasswordComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: NewPasswordComponent
    }
  ]
})
export class NewPasswordComponent implements ControlValueAccessor, OnDestroy, Validator, OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      newPassword: new FormControl(
        { value: null, disabled: true }, [
        Validators.required,
        isValidRegex(ValidationRules.AT_LEAST_EIGHT),
        isValidRegex(ValidationRules.AT_LEAST_ONE_DIGIT),
        isValidRegex(ValidationRules.LOWER_AND_UPPER_CASE_CHARACTER),
        isValidRegex(ValidationRules.SPECIAL_CHARACTER)]),
    });
  }

  get newPassword(): FormControl {
    return this.form.controls['newPassword'] as FormControl;
  }

  onTouched: Function = () => {};

  onChangeSubs: Subscription[] = [];

  registerOnChange(onChange: any) {
    const sub = this.form.valueChanges.subscribe(onChange);
    this.onChangeSubs.push(sub);
  }

  registerOnTouched(onTouched: Function) {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    if (disabled) {
      this.form.disable();
    }
    else {
      this.form.enable();
    }
  }

  writeValue(value: any) {
    if (value) {
      this.form.setValue(value, { emitEvent: false });
    }
  }

  validate(control: AbstractControl) {
    if (this.form.valid) {
      return null;
    }
    let errors : any = {};
    errors = this.addControlErrors(errors, 'newPassword');
    return errors;
  }

  addControlErrors(allErrors: any, controlName: string) {
    const errors = {...allErrors};
    const controlErrors = this.form.controls[controlName].errors;
    if (controlErrors) {
      errors[controlName] = controlErrors;
    }
    return errors;
  }


  newPasswordChanged() {
    if (this.newPassword.value) {
      this.checkPasswordStrengthAsync(this.newPassword);
    }
  }

  checkPasswordStrengthAsync(ctrl: FormControl) {
    const check = of({ isStrong: true }).pipe(delay(2500));
    if (!ctrl.errors) {
      check.subscribe((response) => {
        if (!response.isStrong) {
          ctrl.setErrors({ ...ctrl.errors, weakPassword: true });
          this.form.updateValueAndValidity();
        }
      });
    }
  }

  ngOnDestroy() {
    for (let sub of this.onChangeSubs) {
      sub.unsubscribe();
    }
  }
}
