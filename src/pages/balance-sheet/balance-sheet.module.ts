import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BalanceSheetPage } from './balance-sheet';

@NgModule({
  declarations: [
    BalanceSheetPage,
  ],
  imports: [
    IonicPageModule.forChild(BalanceSheetPage),
  ],
})
export class BalanceSheetPageModule {}
