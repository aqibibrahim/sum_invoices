import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppDashboardPage } from './app-dashboard';

@NgModule({
  declarations: [
    AppDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(AppDashboardPage),
  ],
})
export class AppDashboardPageModule {}
