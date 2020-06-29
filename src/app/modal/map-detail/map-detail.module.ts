import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapDetailPageRoutingModule } from './map-detail-routing.module';

import { MapDetailPage } from './map-detail.page';
import { QrcodePage } from '../qrcode/qrcode.page';
import { QrcodePageModule } from '../qrcode/qrcode.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapDetailPageRoutingModule,
    QrcodePageModule
  ],
  entryComponents: [QrcodePage],
  exports: [MapDetailPage],
  declarations: [MapDetailPage]
})
export class MapDetailPageModule {}
