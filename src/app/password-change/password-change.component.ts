import { OnDestroy, OnInit} from '@angular/core';
import { Component } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { passwordRepeat } from '../validators/password-repeat.validator';
import {Password} from '../const/password.enum';
import {isValidRegex} from '../validators/is-valid-regex.validator';
import {ValidationRules} from '../validators/validation-rules.enum';
import {PasswordStrengthValidator} from '../validators/password-strength';

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
  form!: FormGroup;

  constructor(private passwordStrengthValidator: PasswordStrengthValidator) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      oldPassword: new FormControl(null,
          [
          Validators.required
        ]
    ),
      repeatPassword: new FormControl(
        { value: null, disabled: true }, [
        Validators.required
      ]),
      newPassword: new FormControl({value: '', disabled: true}, {
        validators: [Validators.required,
          Validators.required,
          isValidRegex(ValidationRules.AT_LEAST_EIGHT),
          isValidRegex(ValidationRules.AT_LEAST_ONE_DIGIT),
          isValidRegex(ValidationRules.LOWER_AND_UPPER_CASE_CHARACTER),
          isValidRegex(ValidationRules.SPECIAL_CHARACTER),
          Validators.minLength(4)],
        asyncValidators: [this.passwordStrengthValidator.validate.bind(this.passwordStrengthValidator)]
      })
    },
      {
        validators: passwordRepeat
      } );

    this.newPassword.statusChanges.subscribe((state) => {
      if (state === 'VALID') {
          this.repeatPassword.enable();
      }
    });

  }

    get oldPassword(): FormControl {
    return this.form.controls[Password.OLD] as FormControl;
  }

  get newPassword(): FormControl {
    return this.form.get(Password.NEW) as FormControl;
  }

  get repeatPassword(): FormControl {
    return this.form.controls[Password.REPEAT] as FormControl;
  }

  onTouched:  () => {};

  onChangeSubs: Subscription[] = [];

  registerOnChange(onChange: any): void {
    const sub = this.form.valueChanges.subscribe(onChange);
    this.onChangeSubs.push(sub);
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean): void {
    if (disabled) {
      this.form.disable();
    }
    else {
      this.form.enable();
    }
  }

  writeValue(value: any): void {
    if (value) {
      this.form.setValue(value, { emitEvent: false });
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.newPassword.disabled &&
      !this.repeatPassword.disabled &&
      this.form.valid) {
      return null;
    }

    let errors: any = {};

    if (this.newPassword.disabled) {
        this.newPassword.setErrors(
          {
            newPasswordDisabled: true,
            weakPassword: true,
            required: true,
            lessThanEight: true,
            noDigits: true,
            noLowerAndUpper: true,
            noSpecialCharacter: true
          });
    }

    errors = this.addControlErrors(errors, Password.OLD);
    errors = this.addControlErrors(errors, Password.NEW);
    errors = this.addControlErrors(errors, Password.REPEAT);

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

  oldPasswordChanged() {
    if (this.oldPassword.value) {
      this.newPassword.enable();
    }
  }

  newPasswordChanged() {

  }

  repeatPasswordChanged() {

  }

  ngOnDestroy() {
    for (let sub of this.onChangeSubs) {
      sub.unsubscribe();
    }
  }
}
