import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateTaxPage } from './create-tax';

@NgModule({
  declarations: [
    CreateTaxPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateTaxPage),
  ],
})
export class CreateTaxPageModule {}
