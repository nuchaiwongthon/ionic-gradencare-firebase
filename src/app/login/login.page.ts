import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

import { Storage } from '@ionic/storage';
import { RegisterPage } from '../register/register.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private storage: Storage,
    public modalController: ModalController
  ) {}

  validations_form: FormGroup;
  errorMessage: string = '';
  dataLogin: any = {};
  validation_messages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' },
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      {
        type: 'minlength',
        message: 'Password must be at least 5 characters long.',
      },
    ],
  };
  rememberMe(event) {
    this.dataLogin = {
      username: this.dataLogin.username,
      password: this.dataLogin.password,
      remember: event.detail.checked,
    };
    if (event.detail.checked) {
      this.storage.set('rememberMe', this.dataLogin);
    }
  }
  ngOnInit() {
    this.storage.get('rememberMe').then((val) => {
      if (val) {
        this.dataLogin = val;
      }
    });
    this.validations_form = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.minLength(5), Validators.required])
      ),
    });
  }
  loginUser(value) {
    console.log(this.validations_form.value);
    if (this.dataLogin.remember) {
      this.storage.set('rememberMe', this.dataLogin);
    }

    this.authService.loginUser(value).then(
      (res) => {
        console.log(res);
        localStorage.setItem('login', JSON.stringify(res.user));
        if (this.validations_form.value) {
          this.navCtrl.navigateForward('/tabs');
        }
      },
      (err) => {
        this.errorMessage = err.message;
      }
    );
  }
  async goToRegisterPage() {
    const modal = await this.modalController.create({
      component: RegisterPage,
      cssClass: 'setting-modal',
    });
    return await modal.present();
  }

  ionViewDidEnter() {}
  ionViewDidLeave() {}
}
