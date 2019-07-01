import { NgModule } from '@angular/core';
import { ItemslistComponent } from './itemslist/itemslist';
import { ContactlistComponent } from './contactlist/contactlist';
@NgModule({
	declarations: [ItemslistComponent,
    ContactlistComponent],
	imports: [],
	exports: [ItemslistComponent,
    ContactlistComponent]
})
export class ComponentsModule {}
