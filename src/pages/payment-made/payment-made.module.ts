import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentMadePage } from './payment-made';

@NgModule({
  declarations: [
    PaymentMadePage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentMadePage),
  ],
})
export class PaymentMadePageModule {}
