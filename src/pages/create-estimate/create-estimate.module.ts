import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateEstimatePage } from './create-estimate';

@NgModule({
  declarations: [
    CreateEstimatePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateEstimatePage),
  ],
})
export class CreateEstimatePageModule {}
