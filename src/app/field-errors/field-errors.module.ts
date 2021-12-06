
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldErrorsComponent } from './field-errors.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [FieldErrorsComponent],
  exports: [FieldErrorsComponent],
})
export class FieldErrorsModule {}
