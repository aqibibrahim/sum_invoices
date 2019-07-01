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

cash:any;
capital:any;
estimated_capital:any;
itemcost:any;
expense:any;
payable:any;
payment:any;
recievable:any;

profit:any;
inventory:any;
totalassets:any;
equity:any;
liablity:any;
totalcash:any;

cashrec:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public global:GlobalProvider,public loadingCtrl:LoadingController) {
    this.user_id = this.navParams.get('userid');
    this.date = this.navParams.get('fromdate');
    this.user_name= this.global.company_name;
    console.log(this.user_id,this.date);
    let loader = this.loadingCtrl.create({
      content:'Waiting...'
    });
    loader.present();
    let data = {
      date:this.date,
      userid:this.user_id

      //otherUserId:this.user_id
    }
    this.http.post(' https://sum-finance-latest2.herokuapp.com/invoice/paidstatus', data).map(response => response.json())
      .subscribe(data => {
        //response = jQuery.parseJSON(response);
        console.log(data);
        this.items = data;
        this.cash = data[0].receivedCash;
        this.capital = data[0].capital;
        this.estimated_capital = data[0].estimatedcapital;
        this.itemcost = data[0].itemcost;
        this.expense = data[0].totalExpense;
        this.payable = data[0].totalPayable;
        this.payment = data[0].totalPayment;
        this.recievable = data[0].totalReceiveable;
        this.cashrec = this.cash+this.recievable;
        this.totalcash = this.cash-this.expense-this.payment;
        console.log(this.cash);
        
        loader.dismiss();

        this.profit = this.cashrec-this.estimated_capital-this.expense;
        this.inventory = this.itemcost+this.payable+this.payment;
        this.totalassets = this.totalcash+this.recievable+this.inventory;
        this.equity = this.capital+this.profit;
        this.liablity = this.equity+this.payable;
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
