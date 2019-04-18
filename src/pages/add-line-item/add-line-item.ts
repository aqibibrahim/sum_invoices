import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CreateInvoicesPage} from '../create-invoices/create-invoices';

/**
 * Generated class for the AddLineItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-line-item',
  templateUrl: 'add-line-item.html',
})
export class AddLineItemPage {
  description:string;
  quantity:string;
  rate:string;
  tax:string;
  name:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddLineItemPage');
  }
  savelineitem(){
    this.navCtrl.push(CreateInvoicesPage,{inputname:this.name, description:this.description,quantity:this.quantity,rate:this.rate,tax:this.tax});
  }
}
