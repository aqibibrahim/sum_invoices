import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateItemsPage } from './create-items';

@NgModule({
  declarations: [
    CreateItemsPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateItemsPage),
  ],
})
export class CreateItemsPageModule {}
