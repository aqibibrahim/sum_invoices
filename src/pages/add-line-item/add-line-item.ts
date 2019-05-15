import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CreateInvoicesPage} from '../create-invoices/create-invoices';
import {Http ,Response} from '@angular/http';
import {GlobalProvider} from '../../providers/global/global';
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
  quantity:any;
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
  item_id:any;
  qtyinhands:any;
  purchase_rate:any;
  value_key_rate:any;
  
  constructor(public navCtrl: NavController, public global:GlobalProvider,public navParams: NavParams,public http: Http) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddLineItemPage');
    this.http.get('https://sum-finance-latest2.herokuapp.com/item/getByUserId/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
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
      this.qtyinhands = this.value_desc - this.quantity;
      if(this.quantity > this.qtyinhands){
      alert ("Given Quantity is more than actual quantity");
      }
      else{
        let data = {
          item_quantity:this.qtyinhands
        };
        //console.log(this.data.username);
        this.http.post('https://sum-finance-latest2.herokuapp.com/item/update/'+this.item_id+'', data)
            .subscribe(response => {
              console.log('POST Response:', response);
              //this.navCtrl.push(ItemPage);
            }, error => {
            console.log("Oooops!");
            });
    this.navCtrl.push(CreateInvoicesPage,{inputname:value, description:this.description,quantity:this.quantity,rate:this.quanitytnillrate,tax:this.value_tax,taxtotal:this.taxfixedvalue,purchaserate:this.purchase_rate,itemid:this.item_id
    ,sale_rate:this.value_key_rate});
      }
      
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
    
    var key_id = Object.keys(this.gaming)[0];
    this.item_id = this.gaming[key_id];
    var key_id3 = Object.keys(this.gaming)[6];
    
    var key_id4 = Object.keys(this.gaming)[7];
    var key_id5 = Object.keys(this.gaming)[2];
    var key_id6 = Object.keys(this.gaming)[3];
    var key_id7 = Object.keys(this.gaming)[8];
    var key_id8 = Object.keys(this.gaming)[9];
    var key_id9 = Object.keys(this.gaming)[10];

    var key_desc = Object.keys(this.gaming)[5];
    this.itemquantity = this.gaming[key_id9];
    this.value_desc = this.gaming[key_id9];
    var key_item_quantity =Object.keys(this.gaming)[5];
    var key_rate = Object.keys(this.gaming)[4];
    this.purchase_rate = this.gaming[key_id4];
    this.quanitytnillrate = this.gaming[key_rate];
    this.value_key_rate = this.gaming[key_rate];
    this.value_rate = this.gaming[key_rate];
    


      console.log("key = ", key, "Key_Desc=",key_desc, "key_rate = ",key_rate,key_id,key_id3,key_id4,key_id5,key_id6,key_id7,key_id8,key_id9) // bar
      console.log("value = ", this.value_item,"value_Des = ", this.value_desc,"value_rate = ", this.value_rate,this.itemquantity,this.purchase_rate) // baz
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
