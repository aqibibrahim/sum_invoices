import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayablePage } from './payable';

@NgModule({
  declarations: [
    PayablePage,
  ],
  imports: [
    IonicPageModule.forChild(PayablePage),
  ],
})
export class PayablePageModule {}
