import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VegListPage } from './veg-list.page';

const routes: Routes = [
  {
    path: '',
    component: VegListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VegListPageRoutingModule {}
