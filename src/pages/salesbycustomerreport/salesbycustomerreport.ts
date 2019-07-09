import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import {Http ,Response} from '@angular/http';

/**
 * Generated class for the SalesbycustomerreportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-salesbycustomerreport',
  templateUrl: 'salesbycustomerreport.html',
})
export class SalesbycustomerreportPage {
  public sum : number = 0;
  customer_name:any;
  s_date:any;
  e_date:any;
  datarecord:any ;
  contactid:any;
  fixedamount:any;
  fixedamountarray = [];
  total:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl:LoadingController, public http:Http) {
    this.s_date = this.navParams.get('startdate');
    this.e_date = this.navParams.get('enddate');
    this.customer_name = this.navParams.get('customername');
    this.contactid = this.navParams.get('customerid');

    let loader = this.loadingCtrl.create({
      content:'Waiting...'
    });
    loader.present();
    let data = {
      startDate:this.s_date,
      endDate:this.e_date,
      constid:this.contactid
    }
    console.log(data);
    this.http.post('https://sum-finance-latest2.herokuapp.com/finance/searchcustomer', data).map(response => response.json())
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
        console.log(this.sum);
        loader.dismiss();
        console.log(this.fixedamountarray);
        
      }, error => {
      console.log("Oooops!");
       });
      
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesbycustomerreportPage');
  }
  isReadonly() {
    return this.isReadonly;   //return true/false 
  }
}
