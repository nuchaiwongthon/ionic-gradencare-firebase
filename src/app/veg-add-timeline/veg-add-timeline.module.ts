import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VegAddTimelinePageRoutingModule } from './veg-add-timeline-routing.module';

import { VegAddTimelinePage } from './veg-add-timeline.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VegAddTimelinePageRoutingModule
  ],
  exports: [VegAddTimelinePage],
  declarations: [VegAddTimelinePage]
})
export class VegAddTimelinePageModule {}
