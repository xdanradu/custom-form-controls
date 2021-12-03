import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { Component } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { isValidRegex } from '../validators/is-valid-regex.validator';
import { passwordRepeat } from '../validators/password-repeat.validator';
import { ValidationRules } from '../validators/validation-rules.enum';

@Component({
  selector: 'password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: PasswordChangeComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: PasswordChangeComponent
    }
  ]
})
export class PasswordChangeComponent implements ControlValueAccessor, OnDestroy, Validator, OnInit {
  
  form: FormGroup;
  
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      oldPassword: new FormControl(null, 
          [
          Validators.required
        ]
    ),
      newPassword: new FormControl(
        { value: null, disabled: true }, [
        Validators.required,
        isValidRegex(ValidationRules.AT_LEAST_EIGHT),
        isValidRegex(ValidationRules.AT_LEAST_ONE_DIGIT),
        isValidRegex(ValidationRules.LOWER_AND_UPPER_CASE_CHARACTER),
        isValidRegex(ValidationRules.SPECIAL_CHARACTER)]),
      repeatPassword: new FormControl(
        { value: null, disabled: true }, [
        Validators.required
      ])
    }, { validators: passwordRepeat } );
  }

  get oldPassword(): FormControl {
    return this.form.controls['oldPassword'] as FormControl;
  }

  get newPassword(): FormControl {
    return this.form.controls['newPassword'] as FormControl;
  }

  get repeatPassword(): FormControl {
    return this.form.controls['repeatPassword'] as FormControl;
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
    if (!this.form.controls['newPassword'].disabled &&
      !this.form.controls['repeatPassword'].disabled &&
      this.form.valid) {
      return null;
    }

    let errors : any = {};

    errors = this.addControlErrors(errors, "oldPassword");
    errors = this.addControlErrors(errors, "newPassword");
    errors = this.addControlErrors(errors, "repeatPassword");
    if (this.newPassword.disabled) {
      errors = { ...errors, newPassword: 'disabled' }
    };
    if (this.repeatPassword.disabled) {
      errors = { ...errors, repeatPassword: 'disabled' }
    };
    // console.log(errors);
    return errors;
  }

  addControlErrors(allErrors: any, controlName:string) {

    const errors = {...allErrors};

    const controlErrors = this.form.controls[controlName].errors;

    if (controlErrors) {
      errors[controlName] = controlErrors;
    }

    return errors;
  }


  oldPasswordChanged() {
    if (this.oldPassword.value) {
      this.newPassword.enable();
    }
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
        } else {
          this.repeatPassword.enable();
        }
      });
    }
  }

  repeatPasswordChanged() {
    // console.log('changed');
  }

  ngOnDestroy() {
    for (let sub of this.onChangeSubs) {
      sub.unsubscribe();
    }
  }
}
