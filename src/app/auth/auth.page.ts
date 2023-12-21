import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  public isLoggedIn$ = this.authService.isLoggedIn$;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.initIsLoggedInSubscription();
  }

  public initIsLoggedInSubscription(): void {
    this.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigate(['/places']);
      }
    });

    this.authService.authIsLoading$.subscribe((authIsLoading) => {
      if (authIsLoading) {
        this.loadingCtrl
          .create({ message: 'Loading...' })
          .then((loadingCtrl) => {
            loadingCtrl.present();
          });
      } else {
        this.loadingCtrl.getTop().then(loader => {
          if(loader) {
            this.loadingCtrl.dismiss();
          }
        })
      }
    });
  }

  public onLogin(): void {
    this.authService.login();
  }

  public showLoadingCtrl(): void {}
}
