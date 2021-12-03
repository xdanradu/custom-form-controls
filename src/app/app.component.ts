import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  form = this.fb.group({
    password: new FormControl(null)
  });
  
  constructor(private fb: FormBuilder) {}

  get password() {
    return this.form.controls['password'];
  }

}
