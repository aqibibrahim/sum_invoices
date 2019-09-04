import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpenselistPage } from './expenselist';

@NgModule({
  declarations: [
    ExpenselistPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpenselistPage),
  ],
})
export class ExpenselistPageModule {}
