import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesItemPage } from './sales-item';

@NgModule({
  declarations: [
    SalesItemPage,
  ],
  imports: [
    IonicPageModule.forChild(SalesItemPage),
  ],
})
export class SalesItemPageModule {}
