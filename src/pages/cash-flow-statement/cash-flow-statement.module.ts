import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CashFlowStatementPage } from './cash-flow-statement';

@NgModule({
  declarations: [
    CashFlowStatementPage,
  ],
  imports: [
    IonicPageModule.forChild(CashFlowStatementPage),
  ],
})
export class CashFlowStatementPageModule {}
