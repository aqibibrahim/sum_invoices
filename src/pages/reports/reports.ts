import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BalanceSheetPage} from '../balance-sheet/balance-sheet';
import {ProfitLossPage} from '../profit-loss/profit-loss';
import {CashFlowStatementPage} from '../cash-flow-statement/cash-flow-statement';
import {SalesCustomerPage} from '../sales-customer/sales-customer';
import {SalesTeamPage} from '../sales-team/sales-team';
import {SaleSalePersonPage} from '../sale-sale-person/sale-sale-person';
import {CustomerBalancePage} from '../customer-balance/customer-balance';
import {AgingSummaryPage} from '../aging-summary/aging-summary';
import {PaymentRecievedPage} from '../payment-recieved/payment-recieved';
import {ExpenseCategoryPage} from '../expense-category/expense-category';
import {VendorBalncesPage} from '../vendor-balnces/vendor-balnces';
import {PaymentMadePage} from '../payment-made/payment-made';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportsPage');
  }
  //Financial Reports
  balance_sheet(){
    this.navCtrl.push(BalanceSheetPage);
  }
  profit_and_loss(){
    this.navCtrl.push(ProfitLossPage);
  }
  cash_flow_statement(){
    this.navCtrl.push(CashFlowStatementPage);
  }
//Sales report
  sales_by_customer(){
    this.navCtrl.push(SalesCustomerPage);
  }
  sales_by_item(){
    this.navCtrl.push(SalesTeamPage);
  }
  sales_sales_person(){
    this.navCtrl.push(SaleSalePersonPage);
  }
  //Receivables Reports
  customer_balance(){
    this.navCtrl.push(CustomerBalancePage);
  }
  aging_summary(){
    this.navCtrl.push(AgingSummaryPage);
  }
  payment_recieved(){ 
    this.navCtrl.push(PaymentRecievedPage);
  }
//Expenses Reports
  expense_by_category(){
    this.navCtrl.push(ExpenseCategoryPage);
  }
// Payables Reports
vendor_balance(){
  this.navCtrl.push(VendorBalncesPage);
  }
  payment_made(){
    this.navCtrl.push(PaymentMadePage);
  }
}
