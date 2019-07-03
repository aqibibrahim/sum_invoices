import { NgModule } from '@angular/core';
import { ItemslistComponent } from './itemslist/itemslist';
import { ContactlistComponent } from './contactlist/contactlist';
import { InvoicelistComponent } from './invoicelist/invoicelist';
@NgModule({
	declarations: [ItemslistComponent,
    ContactlistComponent,
    InvoicelistComponent],
	imports: [],
	exports: [ItemslistComponent,
    ContactlistComponent,
    InvoicelistComponent]
})
export class ComponentsModule {}
