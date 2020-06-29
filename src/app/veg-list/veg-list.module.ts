import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VegListPageRoutingModule } from './veg-list-routing.module';

import { VegListPage } from './veg-list.page';
import { VegDetailPage } from '../veg-detail/veg-detail.page';
import { VegDetailPageModule } from '../veg-detail/veg-detail.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VegListPageRoutingModule,
    VegDetailPageModule
  ],
  entryComponents: [VegDetailPage],
  declarations: [VegListPage]
})
export class VegListPageModule {}
