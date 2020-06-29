import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VegDiagnosisPage } from './veg-diagnosis.page';

const routes: Routes = [
  {
    path: '',
    component: VegDiagnosisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VegDiagnosisPageRoutingModule {}
