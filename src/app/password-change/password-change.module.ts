
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordChangeComponent } from './password-change.component';
import {NewPasswordModule} from '../password-repeat/new-password.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NewPasswordModule
  ],
  declarations: [PasswordChangeComponent],
  exports: [PasswordChangeComponent],
})
export class PasswordChangeModule {}
