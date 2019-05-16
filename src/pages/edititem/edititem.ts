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
  oldqty:any;
  qty:any;
  newqty:any;
  items:any;
  itemname:any;
  name:any;
  sexe: string;
  units:any;
  old_sale_rate:any;
  sale_rate:any;
  new_sale_rate:any;
  sale_account:any;
  sale_tax:any;
  sale_desc:any;
  old_purchase_rate:any;
  purchase_rate:any;
  new_purchase_rate:any;
  purchase_account:any;
  purchase_desc:any;
  

  public check1:boolean=false;
  public purchaseinformation:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {
    this.id= this.navParams.get('id');
    
  this.http.get('https://sum-finance-latest2.herokuapp.com/item/get/'+this.id+'').map(res => res.json()).subscribe(data => {
      console.log(data);
         this.oldqty = data[0].item_quantity;
         this.itemname = data[0].item_name;
         this.old_sale_rate = data[0].sale_rate;
         this.old_purchase_rate = data[0].purchase_rate;
         this.units = data[0].unit;
         this.sale_account = data[0].sale_account;
         this.sale_tax = data[0].sale_tax;
         this.sale_desc = data[0].sale_desc;
       });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EdititemPage');
  }
  updateitem(){
    
    var y = +this.oldqty;
    var y1 = +this.qty;
    this.newqty = y+y1;
    // this.new_sale_rate = this.old_sale_rate+this.sale_rate;
    var x = +this.old_purchase_rate;
    var x1 = +this.purchase_rate;
    this.new_purchase_rate = x+x1;

    var old_total_value = y*x;
    var new_total_value = y1*x1;

    var total_value = (old_total_value+new_total_value)/this.newqty;

    console.log(this.newqty,"Purchase rate"+total_value);
    let data = {
      item_name:this.name,
      item_type : this.sexe,
      unit:this.units,
      sale_rate: this.sale_rate,
      sale_tax:this.sale_tax,
      sale_desc:this.sale_desc,
      purchase_rate:total_value,
      purchase_account:this.purchase_account,
      purchase_desc:this.purchase_desc,
      item_quantity:this.newqty
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

