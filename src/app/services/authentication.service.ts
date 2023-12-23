import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  delay,
  shareReplay,
  startWith,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private loggedInSubject = new Subject<boolean>();
  public isLoggedIn$ = this.loggedInSubject.asObservable().pipe(
    startWith(true),
    delay(500),
    tap(() => this.authIsLoadingSubject.next(false)),
    shareReplay(1)
  );

  private authIsLoadingSubject = new BehaviorSubject<boolean>(false);
  public authIsLoading$ = this.authIsLoadingSubject
    .asObservable()
    .pipe(shareReplay(1));

  constructor() {}

  public login(): void {
    this.authIsLoadingSubject.next(true);
    this.loggedInSubject.next(true);
  }

  public logOut(): void {
    this.authIsLoadingSubject.next(true);
    this.loggedInSubject.next(false);
  }
}
