
import {Component, Input} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';


@Component({
  selector: 'password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: PasswordInputComponent
    }
  ]
})
export class PasswordInputComponent implements ControlValueAccessor{

  @Input()
  public parentForm: FormGroup;

  @Input()
  public fieldName: string;

  @Input()
  public label: string;

  public value: string;
  public changed: ( value: string) => void;
  public touched: () => void;
  public isDisabled: boolean;

  get formField(): FormControl {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  public onChange( event: Event): void {
    const value: string = ( event.target as HTMLInputElement).value;
    this.changed(value);
    // this.touched();
  }

  registerOnChange(fn: any): void {
    this.changed = fn;
  }

  registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

}
