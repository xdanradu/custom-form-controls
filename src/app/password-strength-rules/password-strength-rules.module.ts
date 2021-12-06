
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordStrengthRulesComponent } from './password-strength-rules.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [PasswordStrengthRulesComponent],
  exports: [PasswordStrengthRulesComponent],
})
export class PasswordStrengthRulesModule {}
