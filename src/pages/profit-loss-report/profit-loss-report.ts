import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfitLossReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profit-loss-report',
  templateUrl: 'profit-loss-report.html',
})
export class ProfitLossReportPage {
  s_date:any;
  e_date:any;
  item_name:any;
  expense:any;
  p_rate:any;
  s_rate:any;
  quantity:any;
  pandr:any;
  pandr1:any;
  purchase_cost:any;
  purchase_cost1:any;
  sale_cost:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.get('expenseamount'),this.navParams.get('purchaserate'),this.navParams.get('salerate'),this.navParams.get('quantity'),this.navParams.get('startdate'),this.navParams.get('enddate'));
    this.s_date = this.navParams.get('startdate');
    this.e_date = this.navParams.get('enddate');
    this.item_name = this.navParams.get('itemname');
    this.expense = this.navParams.get('expenseamount');
    this.p_rate = this.navParams.get('purchaserate').toFixed(2);
    this.s_rate = this.navParams.get('salerate');
    this.quantity = this.navParams.get('quantity');
    
    this.purchase_cost = this.p_rate*this.quantity;
    this.purchase_cost1 = this.purchase_cost.toFixed(2);
    this.sale_cost = this.s_rate*this.quantity;
    this.pandr = this.sale_cost - (this.purchase_cost1+this.expense);
    this.pandr1 = this.pandr.toFixed(2);
    console.log("Purchase Cost"+this.purchase_cost,"Sale Cost"+this.sale_cost,"Progit and Loss"+this.pandr.toFixed(2));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfitLossReportPage');
  }

 isReadonly() {
    return this.isReadonly;   //return true/false 
  }
}
