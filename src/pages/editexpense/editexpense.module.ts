import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditexpensePage } from './editexpense';

@NgModule({
  declarations: [
    EditexpensePage,
  ],
  imports: [
    IonicPageModule.forChild(EditexpensePage),
  ],
})
export class EditexpensePageModule {}
