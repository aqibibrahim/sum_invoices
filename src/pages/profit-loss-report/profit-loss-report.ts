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
  purchase_cost2:any;
  sale_cost:any;

  fixedp_rate:any;
  fixeds_rate:any;
  fixedexpense:any;
  fixedquantity:any;
  fixedsale_cost:any;
  

  stringp_rate:any;
  strings_rate:any;
  stringexpense:any;
  stringquantity:any;
  stringpurchase_cost1:any;
  stringsale_cost:any;
  stringpandr1:any;
  lessstringpandr:any;
  greatertringpandr:any;
  shipment=0;
  discount=0;
  tax=0;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.get('expenseamount'),this.navParams.get('purchaserate'),this.navParams.get('salerate'),this.navParams.get('quantity'),this.navParams.get('startdate'),this.navParams.get('enddate'));
    this.s_date = this.navParams.get('startdate');
    this.e_date = this.navParams.get('enddate');
    this.item_name = this.navParams.get('itemname');
    this.expense = this.navParams.get('expenseamount');
    this.p_rate = this.navParams.get('purchaserate');
    this.s_rate = this.navParams.get('salerate');
    this.quantity = this.navParams.get('quantity');
    this.discount = this.navParams.get('discount');
    this.shipment = this.navParams.get('shiping');
    this.tax = this.navParams.get('tax');


    this.purchase_cost = this.p_rate*this.quantity;
    this.purchase_cost1 = this.purchase_cost.toFixed(2);
    this.purchase_cost2 = +this.purchase_cost1;
    this.sale_cost = (this.s_rate*this.quantity);
    this.pandr = (this.sale_cost - (this.purchase_cost2+this.expense))- this.discount + this.shipment;
    this.pandr1 = this.pandr.toFixed(2);
    this.fixedp_rate = this.p_rate.toFixed(2);
    this.fixeds_rate = this.s_rate.toFixed(2);
    this.fixedexpense = this.expense.toFixed(2);
    this.fixedquantity = this.quantity.toFixed(2);
    this.fixedsale_cost = this.sale_cost.toFixed(2);


    this.stringp_rate = this.fixedp_rate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    this.strings_rate = this.fixeds_rate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    this.stringexpense = this.fixedexpense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    this.stringquantity = this.fixedquantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    this.stringpurchase_cost1 = this.purchase_cost1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    this.stringsale_cost = this.fixedsale_cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    this.stringpandr1 = this.pandr1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    
    if(this.pandr <= 0){
      this.lessstringpandr = this.stringpandr1;
    }
    else{
      this.greatertringpandr = this.stringpandr1;
    }


    console.log("Purchase Cost"+this.purchase_cost,"Sale Cost"+this.sale_cost,"Progit and Loss"+this.pandr.toFixed(2));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfitLossReportPage');
  }

 isReadonly() {
    return this.isReadonly;   //return true/false 
  }
}
