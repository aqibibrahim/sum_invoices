import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HomePage } from '../pages/home/home';
import { BillsPage } from '../pages/bills/bills';
import { ItemPage } from '../pages/item/item';
import { ReportsPage } from '../pages/reports/reports';
import {InvoicesPage} from '../pages/invoices/invoices';
import { CreateEstimatePage } from '../pages/create-estimate/create-estimate';
import { CreateInvoicePaymentPage } from '../pages/create-invoice-payment/create-invoice-payment';

// import { CreateItemsPage } from '../pages/create-items/create-items';
import { ContactsPage } from '../pages/contacts/contacts';
import {LoginPage} from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Dashboard', component: HomePage },
      { title: 'Reports', component: ReportsPage },
      { title: 'Contacts', component: ContactsPage },
      { title: 'Items', component: ItemPage },
      { title: 'Estimates', component: CreateEstimatePage },
      { title: 'Invoices', component: InvoicesPage },
      {title: 'Bills', component: BillsPage },
      {title:'Logout' ,component: LoginPage}
      // { title: 'Items', component: CreateEstimatePage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.hideSplashScreen();
      //this.splashScreen.hide();
    });
  }
  hideSplashScreen() {
    if (this.splashScreen) {
      setTimeout(() => {
        this.splashScreen.hide();
      }, 100);
     }
    }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
