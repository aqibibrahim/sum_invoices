import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesCustomerPage } from './sales-customer';

@NgModule({
  declarations: [
    SalesCustomerPage,
  ],
  imports: [
    IonicPageModule.forChild(SalesCustomerPage),
  ],
})
export class SalesCustomerPageModule {}
