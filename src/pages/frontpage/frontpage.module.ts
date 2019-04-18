import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FrontpagePage } from './frontpage';

@NgModule({
  declarations: [
    FrontpagePage,
  ],
  imports: [
    IonicPageModule.forChild(FrontpagePage),
  ],
})
export class FrontpagePageModule {}
