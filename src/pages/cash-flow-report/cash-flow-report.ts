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

  fixedprecash:any;
  fixedpayment:any;
  fixedpreexpense:any;
  fixedcash:any;
  fixedexpense:any;
  fixedopening:any;
  fixedcompanyname:any;
  fixedendingcash:any;
  fixedprepayment:any;
  fixedoutgoing:any;

  stringprecash:any;
  stringpayment:any;
  stringpreexpense:any;
  stringcash:any;
  stringexpense:any;
  stringopening:any;
  stringcompanyname:any;
  stringendingcash:any;
  stringprepayment:any;
  stringoutgoing:any;
    



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

        this.fixedpayment = this.payment.toFixed(2);
        this.fixedcash = this.cash.toFixed(2);
        this.fixedexpense = this.expense.toFixed(2);
        
        
        

        if(this.precash == undefined){
          this.precash =0;
          this.fixedprecash = 0.00;
        }
        if(this.preexpense ==  undefined){
          this.preexpense =0;
          this.fixedpreexpense = 0.00;
        }
        if(this.prepayment == undefined){
          this.prepayment =0;
          this.fixedprepayment = 0.00;
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
        this.fixedopening = this.opening.toFixed(2);

        if(this.opening == NaN){
          this.opening = 0;
        }
        this.outgoing = this.expense+this.payment;
        this.fixedoutgoing = this.outgoing.toFixed(2);
        if(this.outgoing == NaN){
          this.outgoing = 0;
        }

        this.endingcash = (this.opening + this.cash)-this.outgoing;
        this.fixedendingcash = this.endingcash.toFixed(2);
        loader.dismiss();
        this.fixedprecash = this.precash.toFixed(2);
        this.fixedpreexpense = this.preexpense.toFixed(2);
        this.fixedprepayment = this.prepayment.toFixed(2);
        this.stringpayment = this.fixedpayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
       this.stringcash = this.fixedcash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
       this.stringexpense = this.fixedexpense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
       this.stringprecash = this.fixedprecash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
       this.stringpreexpense = this.fixedpreexpense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
       this.stringprepayment = this.fixedprepayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
       this.stringopening = this.fixedopening.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
       this.stringoutgoing = this.fixedoutgoing.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
       this.stringendingcash = this.fixedendingcash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }, error => {
      console.log("Oooops!");
       });

       


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CashFlowReportPage');
  }

}
