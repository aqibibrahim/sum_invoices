import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CreateInvoicesPage} from '../create-invoices/create-invoices';
import {Http ,Response} from '@angular/http';
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
  gaming:string;
  items: any;
  taxvalue:any;
  taxinput:any;
  key:string;
  value_item:any;
  value_rate:any;
  value_desc:any;
  taxrate:any;
  finalrate:any;
  itemquantity:any;
  xyz:any;
  quanitytnillrate:any;
  value_tax:any;
  taxfixedvalue:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddLineItemPage');
    this.http.get('https://sum-finance.herokuapp.com/item/get-all').map(res => res.json()).subscribe(data => {
      console.log(data);
         this.items = data 
       });
       this.http.get('https://sum-finance.herokuapp.com/tax/get-all').map(res => res.json()).subscribe(data => {
        console.log(data);
           this.taxvalue = data 
         });
  

  }

  savelineitem(){
    var key = Object.keys(this.gaming)[1];
    var value = this.gaming[key];
     
      console.log("key = ", key) // bar
      console.log("value = ", value) // baz
      console.log(this.taxinput);
  //   console.log(this.gaming);
  //   let products = this.gaming; //data is the json from the example
  //  console.log(Object.keys(products)[1]); 
  //   var key = Object.keys(products)[1];
  //   var value = products.key;
  //   Object.keys(products).forEach(key => {
  //     console.log(key); //Key1, Key2, Key3
  //     console.log(products[key]['item_name']) //brandname
  //   });
    this.navCtrl.push(CreateInvoicesPage,{inputname:value, description:this.description,quantity:this.quantity,rate:this.quanitytnillrate,tax:this.value_tax,taxtotal:this.taxfixedvalue});
  }
  onSelectChange(tax){

    console.log(tax);
    console.log(this.value_rate);
    var key = Object.keys(tax)[2];
    this.value_tax = tax[key];
     
      console.log("key = ", key) // bar
      console.log("value = ", this.value_tax) // baz

    console.log(this.value_rate/100);
    this.taxrate = (this.value_rate/100)*this.value_tax;
    this.taxfixedvalue = this.taxrate.toFixed(2);
    console.log(this.taxfixedvalue);
    var y = +this.value_rate;
    this.finalrate = this.taxrate+y;  
    console.log(this.finalrate);
    //this.value_rate=this.finalrate;
  }
  onItemChange(){
    console.log(this.gaming);
    var key = Object.keys(this.gaming)[1];
     this.value_item = this.gaming[key];
    
    var key_desc = Object.keys(this.gaming)[5];
    this.value_desc = this.gaming[key_desc];

    var key_rate = Object.keys(this.gaming)[4];
    this.quanitytnillrate = this.gaming[key_rate];
    this.value_rate = this.gaming[key_rate];
    
      console.log("key = ", key, "Key_Desc=",key_desc, "key_rate = ",key_rate) // bar
      console.log("value = ", this.value_item,"value_Des = ", this.value_desc,"value_rate = ", this.value_rate) // baz
  }
  isReadonly() {
    return this.isReadonly;   //return true/false 
  }
  quantitychange(){
    console.log(this.quantity);
    
    this.itemquantity = this.quantity;
    this.xyz = +this.value_rate;
    if(this.itemquantity == ""){
      this.value_rate = this.quanitytnillrate * this.itemquantity;
      
    }

    this.value_rate = this.quanitytnillrate * this.itemquantity;
  }
}
