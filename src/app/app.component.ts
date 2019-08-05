import { Component, ViewChild } from '@angular/core';
import { Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Platform, IonicApp } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import {DashboardPage} from '../pages/dashboard/dashboard';
import { BillsPage } from '../pages/bills/bills';
import { ItemPage } from '../pages/item/item';
import {TaxPage} from '../pages/tax/tax';
import { ReportsPage } from '../pages/reports/reports';
import {InvoicesPage} from '../pages/invoices/invoices';
import {ReceivablePage} from '../pages/receivable/receivable';
import { CreateEstimatePage } from '../pages/create-estimate/create-estimate';
import { CreateInvoicePaymentPage } from '../pages/create-invoice-payment/create-invoice-payment';
import { App } from 'ionic-angular';
// import { CreateItemsPage } from '../pages/create-items/create-items';
import { ContactsPage } from '../pages/contacts/contacts';
import {PayablePage} from '../pages/payable/payable';
import {LoginPage} from '../pages/login/login';
import Parse from 'parse';
import {AppDashboardPage} from '../pages/app-dashboard/app-dashboard';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = DashboardPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,  private ionicApp: IonicApp,public statusBar: StatusBar, public splashScreen: SplashScreen,public app: App,public alertCtrl: AlertController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Dashboard', component: AppDashboardPage },
      { title: 'Reports', component: ReportsPage },
      { title: 'Contacts', component: ContactsPage },
      { title: 'Items', component: ItemPage },
      // { title: 'Estimates', component: CreateEstimatePage },
      { title: 'Invoices', component: InvoicesPage },
      {title:'Receivable' ,component: ReceivablePage},
      {title:'Payable' ,component: PayablePage},
      // {title: 'Bills', component: BillsPage },
      {title:'Tax' ,component: TaxPage},
      
      {title:'Logout' ,component: DashboardPage}

      // { title: 'Items', component: CreateEstimatePage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      //this.statusBar.backgroundColorByHexString('#f37321');
      this.hideSplashScreen();
      
      //this.splashScreen.hide();
    });
  
  }
  showAlert() {
    let confirm = this.alertCtrl.create({
      title: 'Exit Application?',
      message: 'Do you want to exit this application?',
      buttons: [
        {
          text: 'No',
          handler: () => {}
        },
        {
          text: 'Yes',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    confirm.present();
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
