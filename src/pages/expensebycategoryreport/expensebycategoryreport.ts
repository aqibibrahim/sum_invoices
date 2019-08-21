import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import {Http ,Response} from '@angular/http';
import {GlobalProvider} from '../../providers/global/global';
/**
 * Generated class for the ExpensebycategoryreportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-expensebycategoryreport',
  templateUrl: 'expensebycategoryreport.html',
})
export class ExpensebycategoryreportPage {
  public sum : number = 0;
  expense_name:any;
  s_date:any;
  e_date:any;
  datarecord:any;
  fixedamount:any;
  fixedamountarray = [];
  constructor(public navCtrl: NavController, public global:GlobalProvider,public navParams: NavParams,public loadingCtrl:LoadingController, public http:Http) {
    this.s_date = this.navParams.get('startdate');
    this.e_date = this.navParams.get('enddate');
    this.expense_name = this.navParams.get('expensename');

    let loader = this.loadingCtrl.create({
      content:'Waiting...'
    });
    loader.present();
    let data = {
      startDate:this.s_date,
      endDate:this.e_date,
      expensename:this.expense_name,
      userid:this.global.userid
    }
    console.log(data);
    this.http.post('https://sum-invoice-app.herokuapp.com/expense/catgoryexpense', data).map(response => response.json())
      .subscribe(data => {
        //response = jQuery.parseJSON(response);
        console.log(data);
        this.datarecord = data;
        this.sum = 0;
        for(var i=0;i<this.datarecord.length;i++){
          this.fixedamount = this.datarecord[i].amount;
          this.fixedamountarray.push(this.fixedamount);
          
        }
        for(let i = 0; i<this.fixedamountarray.length; i++){
          //this.sum = this.sum + this.fixedamountarray[i];    
          this.sum += Number(this.fixedamountarray[i]);
        }
        // for(var i=0; i<this.datarecord.length;i++){
        //     if(!this.datarecord[i].itemname){
        //       console.log(this.datarecord[i]);
        //     }
        // }
        loader.dismiss();
      }, error => {
      console.log("Oooops!");
       });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpensebycategoryreportPage');
  }
  isReadonly() {
    return this.isReadonly;   //return true/false 
  }
}
