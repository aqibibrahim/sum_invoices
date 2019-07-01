import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import {Http ,Response} from '@angular/http';
import {GlobalProvider} from '../../providers/global/global';
/**
 * Generated class for the CashFlowReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cash-flow-report',
  templateUrl: 'cash-flow-report.html',
})
export class CashFlowReportPage {
  s_date:any;
  e_date:any;
  user_id:any;
  datarecord:any;

  precash:any;
  payment:any;
  preexpense:any;
  cash:any;
  expense:any;
  opening:any;
  companyname:any;
  endingcash:any;
  prepayment:any;
  outgoing:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController, public http:Http,public global:GlobalProvider) {
    this.user_id = this.navParams.get('userid');
    this.s_date = this.navParams.get('startdate');
    this.e_date = this.navParams.get('enddate');
    this.companyname = this.global.company_name;
    let loader = this.loadingCtrl.create({
      content:'Waiting...'
    });
    loader.present();
    let data = {
      startDate:this.s_date,
      endDate:this.e_date,
      userid:this.user_id
    }
    console.log(data);
    



    this.http.post('https://sum-finance-latest2.herokuapp.com/invoice/cashflowrpt', data).map(response => response.json())
      .subscribe(data => {
        //response = jQuery.parseJSON(response);
        console.log(data);
        this.datarecord = data;
        
        this.payment = this.datarecord[0].flowPayment;
        this.cash = this.datarecord[0].flowCash;
        this.expense=this.datarecord[0].flowExpense;
        this.precash = this.datarecord[0].precash;
        this.preexpense = this.datarecord[0].PreExpense;
        this.prepayment = this.datarecord[0].PrePayment;

        if(this.precash == undefined){
          this.precash =0;
        }
        if(this.preexpense ==  undefined){
          this.preexpense =0;
        }
        if(this.prepayment == undefined){
          this.prepayment =0;
        }
        if(this.payment == undefined){
          this.payment =0;
        }
        if(this.cash == undefined){
          this.cash =0;
        }
        if(this.expense == undefined){
          this.expense = 0;
        }
        this.opening = this.precash-(this.prepayment-this.preexpense);
        if(this.opening == NaN){
          this.opening = 0;
        }
        this.outgoing = this.expense+this.payment;
        if(this.outgoing == NaN){
          this.outgoing = 0;
        }

        this.endingcash = (this.opening + this.cash)-this.outgoing;
        loader.dismiss();
      }, error => {
      console.log("Oooops!");
       });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CashFlowReportPage');
  }

}
