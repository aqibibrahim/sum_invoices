import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerBalancePage } from './customer-balance';

@NgModule({
  declarations: [
    CustomerBalancePage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerBalancePage),
  ],
})
export class CustomerBalancePageModule {}
