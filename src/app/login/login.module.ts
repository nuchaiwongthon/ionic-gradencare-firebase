import { RegisterPage } from './../register/register.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';
import { FormBuilder, FormControl } from '@angular/forms';
import { LoginPage } from './login.page';
import { RegisterPageModule } from '../register/register.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LoginPageRoutingModule,
    RegisterPageModule
  ],
  entryComponents: [RegisterPage],
  providers: [FormBuilder, FormControl],
  declarations: [LoginPage]
})
export class LoginPageModule { }
