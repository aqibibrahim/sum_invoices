import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesTeamPage } from './sales-team';

@NgModule({
  declarations: [
    SalesTeamPage,
  ],
  imports: [
    IonicPageModule.forChild(SalesTeamPage),
  ],
})
export class SalesTeamPageModule {}
