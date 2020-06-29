import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VegDiagnosisPageRoutingModule } from './veg-diagnosis-routing.module';

import { VegDiagnosisPage } from './veg-diagnosis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VegDiagnosisPageRoutingModule
  ],
  declarations: [VegDiagnosisPage]
})
export class VegDiagnosisPageModule {}
