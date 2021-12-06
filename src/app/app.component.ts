import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [trigger('myCopyTrigger', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('500ms ease-in', style({ opacity: 1 })),
    ]),
    transition(':leave', [
    animate('1500ms ease-out', style({ opacity: 0 }))
    ])
])]
})
export class AppComponent {
  copied = false;

  form = new FormGroup({
    password: new FormControl(null)
  });

  get password(): FormControl {
    const PASSWORD_CONTROL_NAME = 'password';
    return this.form.controls[PASSWORD_CONTROL_NAME] as FormControl;
  }

  copy(): void {
      navigator.clipboard.writeText('Pass!123^');
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2500);
  }

}
