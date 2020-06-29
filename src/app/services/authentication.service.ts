import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { firebaseConfig } from '../class/config';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private router: Router, private storage: Storage) {
  }
userData: any;
  registerUser(value) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(value.email, value.password)
        .then(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }

  logoutUser() {
    localStorage.removeItem('login');
    this.router.navigate(['/login']);

    if (firebase.auth().currentUser) {
      firebase
        .auth()
        .signOut()
        .then(() => {
        })
        .catch((error) => {
        });
    }
  }

  userDetails() {

   
  }
  userAuth() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.router.navigate(['/tabs']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
