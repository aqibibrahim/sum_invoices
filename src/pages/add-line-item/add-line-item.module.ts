import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddLineItemPage } from './add-line-item';

@NgModule({
  declarations: [
    AddLineItemPage,
  ],
  imports: [
    IonicPageModule.forChild(AddLineItemPage),
  ],
})
export class AddLineItemPageModule {}
