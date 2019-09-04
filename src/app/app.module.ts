import { FormsModule } from '@angular/forms';
//import { MbscModule } from '@mobiscroll/angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {GooglePlus} from '@ionic-native/google-plus';
import firebase from 'firebase';
import { IonicStorageModule } from '@ionic/storage';

import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import {ActionSheet} from '@ionic-native/action-sheet/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SMS } from '@ionic-native/sms';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { RecaptchaModule } from 'ng-recaptcha';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {DashboardPage} from '../pages/dashboard/dashboard';
import { ListPage } from '../pages/list/list';
import { ItemPage } from '../pages/item/item';
import { ReportsPage } from '../pages/reports/reports';
import {InvoicesPage} from '../pages/invoices/invoices';
import {ShippingPage} from '../pages/shipping/shipping';
import {BillingPage} from '../pages/billing/billing';
import { BillsPage } from '../pages/bills/bills';
import {LoginPage} from '../pages/login/login';
import {TaxPage} from '../pages/tax/tax';
import {SignupPage} from '../pages/signup/signup';
import {EditinvoicePage} from '../pages/editinvoice/editinvoice';
import {ExpensePage} from '../pages/expense/expense';
import {ProfitLossReportPage} from '../pages/profit-loss-report/profit-loss-report';
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
import {ForgotpasswordPage} from '../pages/forgotpassword/forgotpassword';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { GlobalProvider } from '../providers/global/global';
// import { SignupProvider } from '../providers/signup/signup';
import {CreateYourCompanyPage} from '../pages/create-your-company/create-your-company';
import {CompanytaxPage} from '../pages/companytax/companytax';
import {SalesbycustomerreportPage} from '../pages/salesbycustomerreport/salesbycustomerreport';
import {SalesItemPage} from '../pages/sales-item/sales-item';
import {SalebyitemreportPage} from '../pages/salebyitemreport/salebyitemreport';
import {ExpensebycategoryreportPage} from '../pages/expensebycategoryreport/expensebycategoryreport';
import {CreateTaxPage} from '../pages/create-tax/create-tax';
import {EditTaxPage} from '../pages/edit-tax/edit-tax';
import {EditProfilePage} from '../pages/edit-profile/edit-profile';
import {ReceivablePage} from '../pages/receivable/receivable';
import { CheckemailProvider } from '../providers/checkemail/checkemail';
import {PayablePage} from '../pages/payable/payable';
import {BalanceSheetReportPage} from '../pages/balance-sheet-report/balance-sheet-report';
import {CashFlowReportPage} from '../pages/cash-flow-report/cash-flow-report';
import {ItemslistComponent} from '../components/itemslist/itemslist';
import {ContactlistComponent} from '../components/contactlist/contactlist';
import {InvoicelistComponent} from '../components/invoicelist/invoicelist';
import {ExpenselistComponent} from '../components/expenselist/expenselist';
import { IonicSelectableModule } from 'ionic-selectable';
import {AppDashboardPage} from '../pages/app-dashboard/app-dashboard';
import { ReportsProvider } from '../providers/reports/reports';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule }from 'angularfire2/auth'; 
import { environment } from '../environment/environment';
import { Device } from '@ionic-native/device';
import { AppAvailability } from '@ionic-native/app-availability';
import {ShortNumberPipe} from '../pipes/short-number/short-number';
import { CompanyProvider } from '../providers/company/company';
import { AutoCompleteModule } from 'ionic2-auto-complete';
import { CompleteTestServiceProvider } from '../providers/complete-test-service/complete-test-service';
import { Network } from '@ionic-native/network';
import {ExpenselistPage} from '../pages/expenselist/expenselist';
import { AppMinimize } from '@ionic-native/app-minimize';
import {EditexpensePage} from '../pages/editexpense/editexpense';
const firebaseConfig = {
  apiKey: "AIzaSyBDowWJg2HFOlYivSbA6oReSq4U7AEsZp4",
  authDomain: "sum-invoice.firebaseapp.com",
  databaseURL: "https://sum-invoice.firebaseio.com",
  projectId: "sum-invoice",
  storageBucket: "",
  messagingSenderId: "277357172965",
  appId: "1:277357172965:web:d4605976be325698"
}
firebase.initializeApp(firebaseConfig);
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
    TaxPage,
    DashboardPage,
    SignupPage,
    EditinvoicePage,
    ExpensePage,
    ProfitLossReportPage,
    ForgotpasswordPage,
    CreateYourCompanyPage,
    CompanytaxPage,
    SalesbycustomerreportPage,
    SalesItemPage,
    SalebyitemreportPage,
    ExpensebycategoryreportPage,
    CreateTaxPage,
    EditTaxPage,
    EditProfilePage,
    ReceivablePage,
    PayablePage,
    BalanceSheetReportPage,
    CashFlowReportPage,
    ItemslistComponent,
    ContactlistComponent,
    InvoicelistComponent,
    AppDashboardPage,
    ShortNumberPipe,
    ExpenselistPage,
    ExpenselistComponent,
    EditexpensePage
  ],
  imports: [ 
    FormsModule, 
    IonicSelectableModule,
    //MbscModule,
    BrowserModule,
    HttpModule,
    AutoCompleteModule,
    IonicModule.forRoot(MyApp),
    RecaptchaModule.forRoot(),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
    //ShortNumberPipe
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
    TaxPage,
    DashboardPage,
    SignupPage,
    EditinvoicePage,
    ExpensePage,
    ProfitLossReportPage,
    ForgotpasswordPage ,
    CreateYourCompanyPage,
    CompanytaxPage,
    SalesbycustomerreportPage,
    SalesItemPage,
    SalebyitemreportPage,
    ExpensebycategoryreportPage,
    CreateTaxPage,
    EditTaxPage,
    EditProfilePage,
    ReceivablePage,
    PayablePage,
    BalanceSheetReportPage,
    CashFlowReportPage,
    AppDashboardPage,
    ExpenselistPage,
    EditexpensePage
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
    Contacts,
    SMS,
    AndroidPermissions,
    GlobalProvider,
    NativeStorage,
    // SignupProvider,
    CheckemailProvider,
    ReportsProvider,
    Device,
    AppAvailability,
    CompanyProvider,
    Network,
    AppMinimize,
    CompleteTestServiceProvider 
    ]
})
export class AppModule {}
