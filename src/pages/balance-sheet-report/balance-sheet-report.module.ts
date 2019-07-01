import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BalanceSheetReportPage } from './balance-sheet-report';

@NgModule({
  declarations: [
    BalanceSheetReportPage,
  ],
  imports: [
    IonicPageModule.forChild(BalanceSheetReportPage),
  ],
})
export class BalanceSheetReportPageModule {}
