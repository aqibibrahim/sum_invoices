import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Nav,AlertController,Platform, LoadingController } from 'ionic-angular';
import {Http ,Response} from '@angular/http';
import {ItemPage} from '../item/item';
import { App } from 'ionic-angular';
import { Network } from '@ionic-native/network';
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
  @ViewChild(Nav) nav: Nav;
  alert:any;
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
  constructor(public navCtrl: NavController, public network:Network,public navParams: NavParams, public loadingCtrl:LoadingController, public app: App,public platform:Platform,public http: Http,public alertCtrl:AlertController) {
    this.id= this.navParams.get('id');
    
  this.http.get('https://sum-invoice-app.herokuapp.com/item/get/'+this.id+'').map(res => res.json()).subscribe(data => {
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
    this.platform.registerBackButtonAction(() => {
      // Catches the active view
      let nav = this.app.getActiveNavs()[0];
      let activeView = nav.getActive();                
      // Checks if can go back before show up the alert
      if(activeView.name === 'EdititemPage') {
          if (nav.canGoBack()){
              nav.pop();
          } else {
            this.navCtrl.push(ItemPage);
             
          }
      }
  });
  }
  ionViewDidEnter() {
    
       this.platform.registerBackButtonAction(() => {
        // Catches the active view
        let nav = this.app.getActiveNavs()[0];
        let activeView = nav.getActive();                
        // Checks if can go back before show up the alert
        if(activeView.name === 'EdititemPage') {
            if (nav.canGoBack()){
              this.navCtrl.push(ItemPage);
            } else {
              this.navCtrl.push(ItemPage);
            }
        }
    });
       
  }
  updateitem(){
    if(this.network.type === 'none'){
      this.alert = this.alertCtrl.create({
        title: 'Alert!',
        message: 'There is no Internet connection available, please proceed again when you have a connnection',
        buttons: [{
            text: 'OK',
            handler: () => {
             this.alert.dismiss();
            }
        }],
        cssClass: 'alertDanger'
    });
    this.alert.present();
    //return;
    }
    else{
      let loader = this.loadingCtrl.create({
        content:'Waiting...'
      });
      loader.present();
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
      this.http.post('https://sum-invoice-app.herokuapp.com/item/update/'+this.id+'', data)
          .subscribe(response => {
            console.log('POST Response:', response);
            loader.dismiss();
            this.navCtrl.push(ItemPage);
          }, error => {
          console.log("Oooops!");
          });
  
    }
    
        }
        
        
isReadonly() {
      return this.isReadonly;   //return true/false 
    }
  }

