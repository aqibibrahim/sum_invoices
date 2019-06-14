import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceivablePage } from './receivable';

@NgModule({
  declarations: [
    ReceivablePage,
  ],
  imports: [
    IonicPageModule.forChild(ReceivablePage),
  ],
})
export class ReceivablePageModule {}
