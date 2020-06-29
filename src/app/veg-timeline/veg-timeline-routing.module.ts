import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VegTimelinePage } from './veg-timeline.page';

const routes: Routes = [
  {
    path: '',
    component: VegTimelinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VegTimelinePageRoutingModule {}
