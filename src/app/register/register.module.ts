import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';
import { FormBuilder, FormControl } from '@angular/forms';
import { RegisterPage } from './register.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule, RegisterPageRoutingModule],
  exports: [RegisterPage],
  providers: [FormBuilder, FormControl],
  declarations: [RegisterPage],
})
export class RegisterPageModule {}
