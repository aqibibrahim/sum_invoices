import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateYourCompanyPage } from './create-your-company';

@NgModule({
  declarations: [
    CreateYourCompanyPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateYourCompanyPage),
  ],
})
export class CreateYourCompanyPageModule {}
