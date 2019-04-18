import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfitLossPage } from './profit-loss';

@NgModule({
  declarations: [
    ProfitLossPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfitLossPage),
  ],
})
export class ProfitLossPageModule {}
