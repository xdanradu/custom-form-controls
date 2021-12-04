
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorRulesComponent } from './error-rules.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ErrorRulesComponent],
  exports: [ErrorRulesComponent],
})
export class ErrorRulesModule {}
