
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordChangeComponent } from './password-change.component';
import {PasswordStrengthRulesModule} from '../password-strength-rules/password-strength-rules.module';
import {PasswordInputModule} from '../password-input/password-input.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PasswordStrengthRulesModule,
        PasswordInputModule
    ],
  declarations: [PasswordChangeComponent],
  exports: [PasswordChangeComponent],
})
export class PasswordChangeModule {}
