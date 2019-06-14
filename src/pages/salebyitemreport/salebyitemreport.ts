import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import {Http ,Response} from '@angular/http';
/**
 * Generated class for the SalebyitemreportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-salebyitemreport',
  templateUrl: 'salebyitemreport.html',
})
export class SalebyitemreportPage {
 item_name:any;
  s_date:any;
  e_date:any;
  datarecord:any ;
  itemid:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController, public http:Http) {
    this.s_date = this.navParams.get('startdate');
    this.e_date = this.navParams.get('enddate');
    this.item_name = this.navParams.get('itemname');
    this.itemid = this.navParams.get('itemid');

    let loader = this.loadingCtrl.create({
      content:'Waiting...'
    });
    loader.present();
    let data = {
      startDate:this.s_date,
      endDate:this.e_date,
      itemid:this.itemid
    }
    console.log(data);
    this.http.post('https://sum-finance-latest2.herokuapp.com/invoice/searchitem', data).map(response => response.json())
      .subscribe(data => {
        //response = jQuery.parseJSON(response);
        console.log(data);
        this.datarecord = data;
        loader.dismiss();
      }, error => {
      console.log("Oooops!");
       });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalebyitemreportPage');
  }
  isReadonly() {
    return this.isReadonly;   //return true/false 
  }
}
