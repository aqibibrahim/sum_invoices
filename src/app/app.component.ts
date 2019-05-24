import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,AlertController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HomePage } from '../pages/home/home';
import {DashboardPage} from '../pages/dashboard/dashboard';
import { BillsPage } from '../pages/bills/bills';
import { ItemPage } from '../pages/item/item';
import {TaxPage} from '../pages/tax/tax';
import { ReportsPage } from '../pages/reports/reports';
import {InvoicesPage} from '../pages/invoices/invoices';
import { CreateEstimatePage } from '../pages/create-estimate/create-estimate';
import { CreateInvoicePaymentPage } from '../pages/create-invoice-payment/create-invoice-payment';
import { App } from 'ionic-angular';
// import { CreateItemsPage } from '../pages/create-items/create-items';
import { ContactsPage } from '../pages/contacts/contacts';
import {LoginPage} from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = DashboardPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public app: App,public alertCtrl: AlertController) {
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
      this.hideSplashScreen();
      //this.splashScreen.hide();
    });
  //   this.platform.registerBackButtonAction(() => {
  //     // Catches the active view
  //     let nav = this.app.getActiveNavs()[0];
  //     let activeView = nav.getActive();                
  //     // Checks if can go back before show up the alert
  //     if(activeView.name === 'HomePage') {
  //         if (nav.canGoBack()){
  //             nav.pop();
  //         } else {
  //             const alert = this.alertCtrl.create({
  //                 title: 'Exit',
  //                 message: 'Want to Exit App?',
  //                 buttons: [{
  //                     text: 'Cancel',
  //                     role: 'cancel',
  //                     handler: () => {
  //                       this.nav.setRoot('HomePage');
  //                     }
  //                 },{
  //                     text: 'OK',
  //                     handler: () => {
                        
  //                       this.platform.exitApp();
  //                     }
  //                 }]
  //             });
  //             alert.present();
  //         }
  //     }
  // });
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
