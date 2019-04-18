import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentRecievedPage } from './payment-recieved';

@NgModule({
  declarations: [
    PaymentRecievedPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentRecievedPage),
  ],
})
export class PaymentRecievedPageModule {}
