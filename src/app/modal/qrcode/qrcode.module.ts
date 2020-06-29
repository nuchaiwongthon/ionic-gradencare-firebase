import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrcodePageRoutingModule } from './qrcode-routing.module';

import { QrcodePage } from './qrcode.page';
import { NgxQRCodeModule } from 'ngx-qrcode3';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrcodePageRoutingModule,
    NgxQRCodeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [QrcodePage],
  declarations: [QrcodePage]
})
export class QrcodePageModule {}
