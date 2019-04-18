import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateInvoicesPage } from './create-invoices';

@NgModule({
  declarations: [
    CreateInvoicesPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateInvoicesPage),
  ],
})
export class CreateInvoicesPageModule {}
