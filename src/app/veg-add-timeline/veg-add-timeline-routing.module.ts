import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VegAddTimelinePage } from './veg-add-timeline.page';

const routes: Routes = [
  {
    path: '',
    component: VegAddTimelinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VegAddTimelinePageRoutingModule {}
