import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import {Http ,Response} from '@angular/http';
import {GlobalProvider} from '../../providers/global/global';
/**
 * Generated class for the BalanceSheetReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-balance-sheet-report',
  templateUrl: 'balance-sheet-report.html',
})
export class BalanceSheetReportPage {
user_id:any;
date:any;
user_name:any;
items:any;

generalpayables = 0;
vatpayables = 0;
shippincharges=0;
discount=0;
revenue = 0;
salevalue=0;
purchasevalue=0;


cash:any;
capital:any;
estimated_capital:any;
itemcost:any;
expense:any;
payable:any;
payment:any;
recievable:any;

fixedcash:any;
fixedcapital:any;
fixedestimated_capital:any;
fixeditemcost:any;
fixedexpense:any;
fixedpayable:any;
fixedpayment:any;
fixedrecievable:any;

stringcash:any;
stringcapital:any;
stringestimated_capital:any;
stringitemcost:any;
stringexpense:any;
stringpayable:any;
stringpayment:any;
stringrecievable:any;

profit:any;
inventory:any;
totalassets:any;
equity:any;
liablity=0;
totalcash:any;
myModelVariable:any;

fixedprofit=0;
fixedinventory:any;
fixedtotalassets:any;
fixedequity:any;
fixedliablity:any;
fixedtotalcash:any;

stringtotalcash:any;
stringprofit:any;
stringinventory:any;
stringtotalassets:any;
stringequity:any;
stringliablity:any;

totalequity =0;

cashrec:any;
fixedcashrec:any;
stringcashrec:any;
cashinhand=0;
initialcash=0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public global:GlobalProvider,public loadingCtrl:LoadingController) {
    this.user_id = this.navParams.get('userid');
    this.date = this.navParams.get('fromdate');
    this.user_name= this.global.company_name;
    console.log(this.user_id,this.date);

    this.http.get('https://sum-invoice-app.herokuapp.com/user/userdata/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
      console.log( data);
      this.cashinhand = data[0].update_initial_cash
      this.initialcash = data[0].intial_cash

       });


    let loader = this.loadingCtrl.create({
      content:'Waiting...'
    });
    loader.present();
    let data = {
      date:this.date,
      userid:this.user_id

      //otherUserId:this.user_id
    }
    this.http.post('https://sum-invoice-app.herokuapp.com/invoice/paidstatus', data).map(response => response.json())
      .subscribe(data => {
        //response = jQuery.parseJSON(response);
        console.log(data);
        this.items = data;
        this.cash = data[0].receivedCash;
        this.vatpayables = data[0].tax;
        this.fixedcash = this.cash.toFixed(2);
        this.shippincharges = data[0].shipingcaharges;
        this.discount = data[0].Discount;
        this.salevalue = data[0].saleamount;
        this.purchasevalue = data[0].purchaseamount;
        //this.capital = data[0].capital;
        //this.fixedcapital = this.capital.toFixed(2);
        //this.estimated_capital = data[0].estimatedcapital;
        //this.fixedestimated_capital = this.estimated_capital.toFixed(2);
        this.itemcost = data[0].itemcost;
        this.fixeditemcost = this.itemcost.toFixed(2);
        this.expense = data[0].totalExpense;
        this.fixedexpense = this.expense.toFixed(2);
        this.payable = data[0].totalPayable;
        this.fixedpayable = this.payable.toFixed(2);
        this.payment = data[0].totalPayment;
        this.fixedpayment = this.payment.toFixed(2);
        this.recievable = data[0].totalReceiveable;
        this.fixedrecievable = this.recievable.toFixed(2);
        this.cashrec = this.cash + this.recievable;
        this.fixedcashrec = this.cashrec.toFixed(2);
        this.totalcash = this.cash-this.expense-this.payment;
        //this.totalcash = Math.abs(this.totalcash)
        this.fixedtotalcash = this.totalcash.toFixed(2);
        console.log(this.cash);
        
        loader.dismiss();
        this.revenue = (this.salevalue - this.discount)  + this.shippincharges;
        this.profit = this.revenue - this.purchasevalue - this.expense
        this.fixedprofit = this.profit.toFixed(2);
        this.inventory = this.itemcost+this.payable+this.payment;
        this.fixedinventory = this.inventory.toFixed(2);
        this.totalassets = this.cashinhand+this.recievable+this.inventory;
        this.fixedtotalassets = this.totalassets.toFixed(2);
        //this.equity = this.capital+this.profit;
        this.liablity = this.initialcash + this.vatpayables + this.profit;
        this.fixedliablity = this.liablity.toFixed(2);
        
        //this.stringcash = this.fixedcash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        //this.stringcapital = this.fixedcapital.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        //this.stringestimated_capital = this.fixedestimated_capital.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        this.stringitemcost = this.fixeditemcost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        this.stringexpense = this.fixedexpense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        this.stringpayable = this.fixedpayable.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        this.stringpayment = this.fixedpayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        this.stringrecievable = this.fixedrecievable.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        this.stringcashrec = this.fixedcashrec.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        this.stringtotalcash = this.fixedtotalcash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") 

        //this.stringprofit = this.fixedprofit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
        this.stringinventory = this.fixedinventory.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
        this.stringtotalassets = this.fixedtotalassets.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
        //this.stringequity = this.fixedtotalcash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
        this.stringliablity = this.fixedliablity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
        

        //this.totalequity = this.capital + this.profit + this.vatpayables;

      }, error => {
      console.log("Oooops!");
       });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BalanceSheetReportPage');
  }
  isReadonly() {
    return this.isReadonly;   //return true/false 
  }
}
