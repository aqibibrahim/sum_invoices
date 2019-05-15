import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http ,Response} from '@angular/http';
import {ItemPage} from '../item/item';

/**
 * Generated class for the EdititemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edititem',
  templateUrl: 'edititem.html',
})
export class EdititemPage {
  id:any;
  qty:any;
  items:any;
  itemname:any;
  name:any;
  sexe: string;
  units:any;
  sale_rate:any;
  sale_account:any;
  sale_tax:any;
  sale_desc:any;
  purchase_rate:any;
  purchase_account:any;
  purchase_desc:any;


  value_sale_rate:any;
  value_item_name:any;
  value_unit:any;
  value_sale_desc:any;
  value_purchase_rate:any;
  value_item_type:any;
  value_item_quantity:any;

  public check1:boolean=false;
  public purchaseinformation:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {
    this.id= this.navParams.get('id');
    
  this.http.get('https://sum-finance-latest2.herokuapp.com/item/get/'+this.id+'').map(res => res.json()).subscribe(data => {
      console.log(data);
         this.items = data
         var key_sale_rate = Object.keys(this.items)[4];
         var key_item_name = Object.keys(this.items)[1];
         var key_unit = Object.keys(this.items)[3];
         var key_item_quantity = Object.keys(this.items)[5];
         var key_purchase_rate = Object.keys(this.items)[10];
         var key_sale_desc = Object.keys(this.items)[11];
         var key_item_type = Object.keys(this.items)[2];
         var key_purchase_account = Object.keys(this.items)[8];
         var key_purchase_desc = Object.keys(this.items)[9];
        // var key1  = Object.keys(this.items)[0];
        // var key2  = Object.keys(this.items)[8];
        // var key3  = Object.keys(this.items)[9];
        // var key4  = Object.keys(this.items)[10];
        // var key5  = Object.keys(this.items)[11];

          this.value_sale_rate = this.items[key_sale_rate];
          this.value_item_name = this.items[key_item_name];
          this.value_unit = this.items[key_unit];
          this.value_sale_desc = this.items[key_sale_desc];
          this.value_purchase_rate = this.items[key_purchase_rate];
          this.value_item_type = this.items[key_item_type];
          this.value_item_quantity = this.items[key_item_quantity];
          

        console.log( key_sale_rate,key_item_name,key_unit,key_item_quantity,key_purchase_rate,key_sale_desc,key_item_type,key_purchase_account,key_purchase_desc)
       });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EdititemPage');
  }
  updateitem(){
    let data = {
      item_name:this.name,
      item_type : this.sexe,
      unit:this.units,
      sale_rate: this.sale_rate,
      sale_tax:this.sale_tax,
      sale_desc:this.sale_desc,
      purchase_rate:this.purchase_rate,
      purchase_account:this.purchase_account,
      purchase_desc:this.purchase_desc,
      item_quantity:this.qty
    };
    //console.log(this.data.username);
    this.http.post('https://sum-finance-latest2.herokuapp.com/item/update/'+this.id+'', data)
        .subscribe(response => {
          console.log('POST Response:', response);
          this.navCtrl.push(ItemPage);
        }, error => {
        console.log("Oooops!");
        });
        }
  }

