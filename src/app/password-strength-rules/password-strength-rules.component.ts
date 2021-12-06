import {Component, Input} from '@angular/core';

@Component({
  selector: 'password-strength-rules',
  templateUrl: './password-strength-rules.component.html',
  styleUrls: ['./password-strength-rules.component.scss']
})
export class PasswordStrengthRulesComponent {
  @Input()
  public errors: any;

  @Input()
  pending: boolean;

}
