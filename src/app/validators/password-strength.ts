import { Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { PasswordStrengthService } from './password-strength.service';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PasswordStrengthValidator implements AsyncValidator {
  constructor(private passwordStrengthService: PasswordStrengthService) {}

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.passwordStrengthService.isPasswordStrong(ctrl.value).pipe(
      map(isStrong => {
        return (isStrong ? null : { passwordIsWeak: true });
        }),
      catchError(() => of(null))
    );
  }
}
