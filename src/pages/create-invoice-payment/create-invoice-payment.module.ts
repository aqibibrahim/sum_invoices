import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateInvoicePaymentPage } from './create-invoice-payment';

@NgModule({
  declarations: [
    CreateInvoicePaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateInvoicePaymentPage),
  ],
})
export class CreateInvoicePaymentPageModule {}
