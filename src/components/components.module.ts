import { NgModule } from '@angular/core';
import { ItemslistComponent } from './itemslist/itemslist';
import { ContactlistComponent } from './contactlist/contactlist';
import { InvoicelistComponent } from './invoicelist/invoicelist';
import { ExpenselistComponent } from './expenselist/expenselist';
@NgModule({
	declarations: [ItemslistComponent,
    ContactlistComponent,
    InvoicelistComponent,
    ExpenselistComponent],
	imports: [],
	exports: [ItemslistComponent,
    ContactlistComponent,
    InvoicelistComponent,
    ExpenselistComponent]
})
export class ComponentsModule {}
