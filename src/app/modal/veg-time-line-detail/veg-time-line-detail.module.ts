import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VegTimeLineDetailPageRoutingModule } from './veg-time-line-detail-routing.module';

import { VegTimeLineDetailPage } from './veg-time-line-detail.page';
import { CalendarModule } from 'ion2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarModule,
    VegTimeLineDetailPageRoutingModule,
  ],
  exports: [VegTimeLineDetailPage],
  declarations: [VegTimeLineDetailPage],
})
export class VegTimeLineDetailPageModule {}
