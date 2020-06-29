import { Component, OnInit } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements CanActivate, OnInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private storage: Storage,
    private authenticationService: AuthenticationService,
    private navCtrl: NavController
  ) {
    this.initializeApp();
  }
  ngOnInit() {
    let token = localStorage.getItem('login');
    if (token) {
      this.navCtrl.navigateRoot('/tabs');
    } else {
      this.navCtrl.navigateRoot('/login');
    }
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user: firebase.User) => {
        console.log(user);
        if (user) {
          resolve(true);
          console.log('User is logged in');
          this.router.navigate(['/tabs']);
        } else {
          console.log('User is not logged in');
          this.router.navigate(['/']);
          resolve(false);
        }
      });
    });
  }
}
