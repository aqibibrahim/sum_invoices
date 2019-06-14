import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditTaxPage } from './edit-tax';

@NgModule({
  declarations: [
    EditTaxPage,
  ],
  imports: [
    IonicPageModule.forChild(EditTaxPage),
  ],
})
export class EditTaxPageModule {}
