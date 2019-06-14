import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform,App,IonicApp,Nav,AlertController } from 'ionic-angular';
import {BalanceSheetPage} from '../balance-sheet/balance-sheet';
import {ProfitLossPage} from '../profit-loss/profit-loss';
import {CashFlowStatementPage} from '../cash-flow-statement/cash-flow-statement';
import {SalesCustomerPage} from '../sales-customer/sales-customer';
import {SaleSalePersonPage} from '../sale-sale-person/sale-sale-person';
import {CustomerBalancePage} from '../customer-balance/customer-balance';
import {AgingSummaryPage} from '../aging-summary/aging-summary';
import {PaymentRecievedPage} from '../payment-recieved/payment-recieved';
import {ExpenseCategoryPage} from '../expense-category/expense-category';
import {VendorBalncesPage} from '../vendor-balnces/vendor-balnces';
import {PaymentMadePage} from '../payment-made/payment-made';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { HomePage } from '../home/home';
import {SalesItemPage} from '../sales-item/sales-item';

/**
 * Generated class for the ReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {
  @ViewChild(Nav) nav: Nav;
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform:Platform, public app:App, public ionicapp:IonicApp, public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportsPage');
    this.platform.registerBackButtonAction(() => {
      // Catches the active view
      let nav = this.app.getActiveNavs()[0];
      let activeView = nav.getActive();                
      // Checks if can go back before show up the alert
  
      let activePortal = this.ionicapp._loadingPortal.getActive() ||
      this.ionicapp._modalPortal.getActive() ||
      this.ionicapp._toastPortal.getActive() ||
      this.ionicapp._overlayPortal.getActive();
  
    if (activePortal) {
      activePortal.dismiss();
    }
    else {
      if(activeView.name === 'ReportsPage') {
        if (nav.canGoBack()){
            nav.pop();
        } else {
            const alert = this.alertCtrl.create({
                title: 'Exit',
                message: 'Want to Exit App?',
                buttons: [{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                      this.nav.setRoot('HomePage');
                    }
                },{
                    text: 'OK',
                    handler: () => {
                      
                      this.platform.exitApp();
                    }
                }]
            });
            alert.present();
        }
    }else {
      this.nav.setRoot('HomePage');
      }
    }
      
  });
  }
  ionViewWillEnter(){
    this.platform.registerBackButtonAction(() => {
      // Catches the active view
      let nav = this.app.getActiveNavs()[0];
      let activeView = nav.getActive();                
      // Checks if can go back before show up the alert

      let activePortal = this.ionicapp._loadingPortal.getActive() ||
      this.ionicapp._modalPortal.getActive() ||
      this.ionicapp._toastPortal.getActive() ||
      this.ionicapp._overlayPortal.getActive();

    if (activePortal) {
      activePortal.dismiss();
    }
    else {
      if(activeView.name === 'CreateInvoicesPage') {
        if (nav.canGoBack()){
            nav.pop();
        } else {
            const alert = this.alertCtrl.create({
                title: 'Exit',
                message: 'Want to Exit App?',
                buttons: [{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                      this.navCtrl.push(HomePage);
                    }
                },{
                    text: 'OK',
                    handler: () => {
                      
                      this.platform.exitApp();
                    }
                }]
            });
            alert.present();
        }
    }else {
      this.navCtrl.push(HomePage);
      }
    }
      
  });
  }
  //Financial Reports
  balance_sheet(){
    alert("Report is Under construction")
    //this.navCtrl.push(BalanceSheetPage);
  }
  profit_and_loss(){
    this.navCtrl.push(ProfitLossPage);
  }
  cash_flow_statement(){
    alert("Report is Under construction")
    //this.navCtrl.push(CashFlowStatementPage);
  }
//Sales report
  sales_by_customer(){
    //alert("Report is Under construction")
    this.navCtrl.push(SalesCustomerPage);
  }
  sales_by_item(){
    
    this.navCtrl.push(SalesItemPage);
  }
  sales_sales_person(){
    alert("Report is Under construction")
    //this.navCtrl.push(SaleSalePersonPage);
  }
  //Receivables Reports
  customer_balance(){
    alert("Report is Under construction")
    //this.navCtrl.push(CustomerBalancePage);
  }
  aging_summary(){
    alert("Report is Under construction")
    //this.navCtrl.push(AgingSummaryPage);
  }
  payment_recieved(){ 
    alert("Report is Under construction")
    //this.navCtrl.push(PaymentRecievedPage);
  }
//Expenses Reports
  expense_by_category(){
    //alert("Report is Under construction")
    this.navCtrl.push(ExpenseCategoryPage);
  }
// Payables Reports
vendor_balance(){
  alert("Report is Under construction")
  //this.navCtrl.push(VendorBalncesPage);
  }
  payment_made(){
    alert("Report is Under construction")
    //this.navCtrl.push(PaymentMadePage);
  }
}
