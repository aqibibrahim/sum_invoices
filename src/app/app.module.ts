import { FormsModule } from '@angular/forms';
//import { MbscModule } from '@mobiscroll/angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {GooglePlus} from '@ionic-native/google-plus';
import firebase from 'firebase';
import { IonicStorageModule } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import {ActionSheet} from '@ionic-native/action-sheet/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SocialSharing } from '@ionic-native/social-sharing';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ItemPage } from '../pages/item/item';
import { ReportsPage } from '../pages/reports/reports';
import {InvoicesPage} from '../pages/invoices/invoices';
import {ShippingPage} from '../pages/shipping/shipping';
import {BillingPage} from '../pages/billing/billing';
import { BillsPage } from '../pages/bills/bills';
import {LoginPage} from '../pages/login/login';
import {TaxPage} from '../pages/tax/tax';

import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ContactsPage } from '../pages/contacts/contacts';
import { CreateContactPage } from '../pages/create-contact/create-contact';
import {CreateItemsPage} from '../pages/create-items/create-items';
import {BalanceSheetPage} from '../pages/balance-sheet/balance-sheet';
import {ProfitLossPage} from '../pages/profit-loss/profit-loss';
import {CashFlowStatementPage} from '../pages/cash-flow-statement/cash-flow-statement';
import {SalesCustomerPage} from '../pages/sales-customer/sales-customer';
import {SalesTeamPage} from '../pages/sales-team/sales-team';
import {SaleSalePersonPage} from '../pages/sale-sale-person/sale-sale-person';
import {CustomerBalancePage} from '../pages/customer-balance/customer-balance';
import {AgingSummaryPage} from '../pages/aging-summary/aging-summary';
import {PaymentRecievedPage} from '../pages/payment-recieved/payment-recieved';
import {ExpenseCategoryPage} from '../pages/expense-category/expense-category';
import {VendorBalncesPage} from '../pages/vendor-balnces/vendor-balnces';
import {PaymentMadePage} from '../pages/payment-made/payment-made';
import {ContactdetailsPage} from '../pages/contactdetails/contactdetails';
import {CreateInvoicesPage} from '../pages/create-invoices/create-invoices';
import {AddLineItemPage} from '../pages/add-line-item/add-line-item';
import {InvoicedeatilsPage} from '../pages/invoicedeatils/invoicedeatils';
import {EdititemPage} from '../pages/edititem/edititem';

import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ContactsPage,
    CreateContactPage,
    CreateItemsPage,
    ItemPage,
    ReportsPage,
    InvoicesPage,
    ShippingPage,
    BillingPage,
    BalanceSheetPage,
    ProfitLossPage,
    CashFlowStatementPage,
    SalesCustomerPage,
    SalesTeamPage,
    SaleSalePersonPage,
    CustomerBalancePage,
    AgingSummaryPage,
    PaymentRecievedPage,
    ExpenseCategoryPage,
    VendorBalncesPage,
    PaymentMadePage,
    ContactdetailsPage,
    CreateInvoicesPage,
    AddLineItemPage,
    InvoicedeatilsPage,
    BillsPage,
    LoginPage,
    EdititemPage,
    TaxPage
  ],
  imports: [ 
    FormsModule, 
   
    //MbscModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ContactsPage,
    CreateContactPage,
    CreateItemsPage,
    ItemPage,
    ReportsPage,
    InvoicesPage,
    ShippingPage,
    BillingPage,
    BalanceSheetPage,
    ProfitLossPage,
    CashFlowStatementPage,
    SalesCustomerPage,
    SalesTeamPage,
    SaleSalePersonPage,
    CustomerBalancePage,
    AgingSummaryPage,
    PaymentRecievedPage,
    ExpenseCategoryPage,
    VendorBalncesPage,
    PaymentMadePage,
    ContactdetailsPage,
    CreateInvoicesPage,
    AddLineItemPage,
    InvoicedeatilsPage,
    BillsPage,
    LoginPage,
    EdititemPage,
    TaxPage
  ],
  providers: [
    
    SQLite,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GooglePlus,
    File,
    FileOpener,
    SocialSharing,
    ActionSheet,
    EmailComposer,
    Contacts
    ]
})
export class AppModule {}
