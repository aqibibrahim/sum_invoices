import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController } from 'ionic-angular';
import {Http ,Response} from '@angular/http';
import {GlobalProvider} from '../../providers/global/global';
/**
 * Generated class for the ExpensePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-expense',
  templateUrl: 'expense.html',
})
export class ExpensePage {
items:any;
expensedate:any;
itemname:any;
amount:any;
name:any;
item_id:any;
item_name:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public tostctrl: ToastController,public global:GlobalProvider, public http:Http) {
    this.http.get('https://sum-finance-latest2.herokuapp.com/item/getByUserId/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
      console.log(data);
         this.items = data 
       });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpensePage');
  }
  addexpense(){
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
    this.http.post('https://sum-finance-latest2.herokuapp.com/expense/create', data)
    .subscribe(response => {
      console.log('POST Response:', response);
      loader.dismiss();
      let toast = this.tostctrl.create({
        message:'Data Save',
        duration:2000
      });
      toast.present();
  //    this.navCtrl.push(InvoicesPage);
    }, error => {
      loader.dismiss();
      let toast = this.tostctrl.create({
        message:'Data not Save',
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
