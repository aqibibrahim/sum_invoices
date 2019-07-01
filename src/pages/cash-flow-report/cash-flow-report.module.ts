import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CashFlowReportPage } from './cash-flow-report';

@NgModule({
  declarations: [
    CashFlowReportPage,
  ],
  imports: [
    IonicPageModule.forChild(CashFlowReportPage),
  ],
})
export class CashFlowReportPageModule {}
