import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgingSummaryPage } from './aging-summary';

@NgModule({
  declarations: [
    AgingSummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(AgingSummaryPage),
  ],
})
export class AgingSummaryPageModule {}
