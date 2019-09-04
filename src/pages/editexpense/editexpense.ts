import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, Nav,ToastController,Platform, IonicApp } from 'ionic-angular';
import {Http ,Response} from '@angular/http';
import {GlobalProvider} from '../../providers/global/global';
import { App } from 'ionic-angular';
import { ExpensePage } from '../expense/expense';
import { ExpenselistPage } from '../expenselist/expenselist';

/**
 * Generated class for the EditexpensePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editexpense',
  templateUrl: 'editexpense.html',
})
export class EditexpensePage {
id:any;
expensename:any;
expamount:any;
expitem:any;
expensedate:any;
itemname:any;
amount:any;
name:any;
item_id:any;
item_name:any;
items:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public ionicApp:IonicApp,public app:App,public platform:Platform,public loadingCtrl: LoadingController, public tostctrl: ToastController,public global:GlobalProvider, public http:Http) {
    this.id= this.navParams.get('id');
    this.http.get('https://sum-invoice-app.herokuapp.com/expense/get/'+this.id+'').map(res => res.json()).subscribe(data => {
      console.log(data);
         this.expensename = data[0].exp_name;
          this.expamount = data[0].exp_amount;
         this.expitem = data[0].sale_rate;
         this.expensedate = data[0].exp_date;

       });
       this.http.get('https://sum-invoice-app.herokuapp.com/item/getByUserId/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
      console.log(data);
         this.items = data 
       });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditexpensePage');
  }
  isReadonly() {
    return this.isReadonly;   //return true/false 
  
  }
  updateexpense(){
    let loader = this.loadingCtrl.create({
      content:'Waiting...'
    });
    loader.present();
    let data = {
      exp_name:this.name,
      exp_date:this.expensedate,
      item_name:this.item_name,
      item_id:this.item_id,
      exp_amount:this.amount,
      userId:this.global.userid
    }
    this.http.post('https://sum-invoice-app.herokuapp.com/expense/update/'+this.id+'', data)
    .subscribe(response => {
      console.log('POST Response:', response);
      loader.dismiss();
      let toast = this.tostctrl.create({
        message:'Expense Update Succesfully in your system',
        duration:2000
      });
      toast.present();
      this.navCtrl.push(ExpenselistPage);
    }, error => {
      loader.dismiss();
      let toast = this.tostctrl.create({
        message:'Expense not addedd succesfully',
        duration:2000
      });
      toast.present(); 
    console.log("Oooops!");
    });
  }
  onItemChange(){
    var key_id = Object.keys(this.itemname)[0];
    this.item_id = this.itemname[key_id];
    var key_id1 = Object.keys(this.itemname)[1];
    this.item_name =  this.itemname[key_id1];
  }
}
