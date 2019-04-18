import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpenseCategoryPage } from './expense-category';

@NgModule({
  declarations: [
    ExpenseCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpenseCategoryPage),
  ],
})
export class ExpenseCategoryPageModule {}
