import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VegSettingPage } from './veg-setting.page';

const routes: Routes = [
  {
    path: '',
    component: VegSettingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VegSettingPageRoutingModule {}
