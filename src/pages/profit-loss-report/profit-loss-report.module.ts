import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfitLossReportPage } from './profit-loss-report';

@NgModule({
  declarations: [
    ProfitLossReportPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfitLossReportPage),
  ],
})
export class ProfitLossReportPageModule {}
