import {Component, Input} from '@angular/core';

@Component({
  selector: 'error-rules',
  templateUrl: './error-rules.component.html',
  styleUrls: ['./error-rules.component.scss']
})
export class ErrorRulesComponent {
  @Input()
  public errors: any;

  @Input()
  pending: boolean;

}
