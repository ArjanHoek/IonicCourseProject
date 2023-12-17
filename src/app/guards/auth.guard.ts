import { CanMatch, CanMatchFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { map } from 'rxjs';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
class AuthGuardClass implements CanMatch {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canMatch() {
    return this.authService.isLoggedIn$.pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) return true;
        return this.router.createUrlTree(['/auth']);
      })
    );
  }
}

export const AuthGuard: CanMatchFn = () => inject(AuthGuardClass).canMatch();
