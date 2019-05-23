import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http ,Response } from '@angular/http';
import {CreateContactPage} from '../create-contact/create-contact';
/**
 * Generated class for the BillingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-billing',
  templateUrl: 'billing.html',
})
export class BillingPage {

  billing_street1:any;
  billing_street2:any;
  billing_country:any;
  billing_city:any;
  billing_state:any;
  billing_zipcode:any;
  billing_phone:any;
  billing_fax:any;
  billingaddress = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {
    this.http.get('https://restcountries.eu/rest/v2/all').map(res => res.json()).subscribe(data => {
    console.log(data); 
    for(var i=0;i<data.length;i++){
        console.log(data[i].name);
      }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillingPage');
  }
  savebilling(){
    this.billingaddress.push({street:this.billing_street1,street2:this.billing_street2,city:this.billing_city,state:this.billing_state,zipcode:this.billing_zipcode,
    country:this.billing_country,phone:this.billing_phone});
    this.navCtrl.push(CreateContactPage,{billing_address:this.billingaddress});
  }
}
