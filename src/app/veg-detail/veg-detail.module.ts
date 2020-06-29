import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VegDetailPageRoutingModule } from './veg-detail-routing.module';

import { VegDetailPage } from './veg-detail.page';
import { QrcodePage } from '../modal/qrcode/qrcode.page';
import { QrcodePageModule } from '../modal/qrcode/qrcode.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VegDetailPageRoutingModule,
    QrcodePageModule,
  ],
  entryComponents: [QrcodePage],
  exports: [VegDetailPage],
  declarations: [VegDetailPage]
})
export class VegDetailPageModule {}
