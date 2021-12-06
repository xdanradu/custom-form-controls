import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

const ALTER_EGOS = ['Eric'];

@Injectable({ providedIn: 'root' })
export class PasswordStrengthService {
  isPasswordStrong(password: string): Observable<boolean> {
    const isTaken = password === 'Pass!123^';

    return of(isTaken).pipe(delay(1500));
  }
}
