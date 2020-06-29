import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VegTimeLineDetailPage } from './veg-time-line-detail.page';

const routes: Routes = [
  {
    path: '',
    component: VegTimeLineDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VegTimeLineDetailPageRoutingModule {}
