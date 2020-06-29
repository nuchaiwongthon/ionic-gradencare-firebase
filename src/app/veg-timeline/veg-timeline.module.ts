import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VegTimelinePageRoutingModule } from './veg-timeline-routing.module';

import { VegTimelinePage } from './veg-timeline.page';
import { VegTimeLineDetailPageModule } from '../modal/veg-time-line-detail/veg-time-line-detail.module';
import { VegTimeLineDetailPage } from '../modal/veg-time-line-detail/veg-time-line-detail.page';
import { MapDetailPage } from '../modal/map-detail/map-detail.page';
import { MapDetailPageModule } from '../modal/map-detail/map-detail.module';
import { VegAddTimelinePage } from '../veg-add-timeline/veg-add-timeline.page';
import { VegAddTimelinePageModule } from '../veg-add-timeline/veg-add-timeline.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VegTimelinePageRoutingModule,
    VegTimeLineDetailPageModule,
    MapDetailPageModule,
    VegAddTimelinePageModule
  ],
  entryComponents: [VegTimeLineDetailPage, MapDetailPage, VegAddTimelinePage],
  declarations: [VegTimelinePage]
})
export class VegTimelinePageModule {}
