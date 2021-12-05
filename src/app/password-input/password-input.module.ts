import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordInputComponent } from './password-input.component';
import {FieldErrorsModule} from '../field-errors/field-errors.module';

@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FieldErrorsModule
  ],
  declarations: [PasswordInputComponent],
  exports: [PasswordInputComponent],
})
export class PasswordInputModule {}
