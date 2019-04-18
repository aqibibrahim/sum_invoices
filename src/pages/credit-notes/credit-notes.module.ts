import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreditNotesPage } from './credit-notes';

@NgModule({
  declarations: [
    CreditNotesPage,
  ],
  imports: [
    IonicPageModule.forChild(CreditNotesPage),
  ],
})
export class CreditNotesPageModule {}
