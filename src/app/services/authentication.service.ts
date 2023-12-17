import { Injectable } from '@angular/core';
import { Subject, shareReplay, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private loggedInSubject = new Subject<boolean>();
  public isLoggedIn$ = this.loggedInSubject
    .asObservable()
    .pipe(startWith(false), shareReplay(1));

  constructor() {}

  public login(): void {
    this.loggedInSubject.next(true);
  }

  public logOut(): void {
    this.loggedInSubject.next(false);
  }
}
