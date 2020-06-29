import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VegSettingPageRoutingModule } from './veg-setting-routing.module';

import { VegSettingPage } from './veg-setting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VegSettingPageRoutingModule
  ],
  declarations: [VegSettingPage]
})
export class VegSettingPageModule {}
