import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform,AlertController } from 'ionic-angular';
import {Http ,Response } from '@angular/http';
import { App } from 'ionic-angular';
import {TaxPage} from '../tax/tax';
import { Network } from '@ionic-native/network';

/**
 * Generated class for the EditTaxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-tax',
  templateUrl: 'edit-tax.html',
})
export class EditTaxPage {
  taxname:any;
  taxvalue:any;
  tax_name:any;
  tax_value:any;
  id:any;
  alert:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public network:Network,public alertCtrl:AlertController,public http:Http, public platform:Platform, public app:App) {
    this.id= this.navParams.get('id');
    this.http.get('https://sum-invoice-app.herokuapp.com/tax/get/'+this.id+'').map(res => res.json()).subscribe(data => {
      console.log(data);
      var key = Object.keys(data)[1];
      this.tax_name = data[key];
     
     var key_id = Object.keys(data)[2];
     this.tax_value = data[key_id];

        //  this.tax_name = data[0].tax_name;
        //  this.tax_value = data[0].tax_precentage;
       });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditTaxPage');
  }
  ionViewDidEnter() {
    
    this.platform.registerBackButtonAction(() => {
     // Catches the active view
     let nav = this.app.getActiveNavs()[0];
     let activeView = nav.getActive();                
     // Checks if can go back before show up the alert
     if(activeView.name === 'EditTaxPage') {
         if (nav.canGoBack()){
           this.navCtrl.push(TaxPage);
         } else {
           this.navCtrl.push(TaxPage);
         }
     }
 });
    
}
updatetax(){
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
  }else{
    if(this.taxvalue == 0 || this.taxvalue == undefined){
      this.alert = this.alertCtrl.create({
        title: 'Oh Snap!',
        message: 'Please Add Tax Value Must me greater than 0',
        buttons: [{
            text: 'OK',
            handler: () => {
              //this.navCtrl.push(CreateInvoicesPage);
              console.log("Ok clicked")
            }
        }],
        cssClass: 'alertDanger'
    });
    this.alert.present();
    }
    else{
      let data = {
        tax_name:this.taxname,
        tax_precentage : this.taxvalue
      };
      //console.log(this.data.username);
      this.http.post('https://sum-invoice-app.herokuapp.com/tax/update/'+this.id+'', data)
          .subscribe(response => {
            console.log('POST Response:', response);
            this.navCtrl.push(TaxPage);
          }, error => {
          console.log("Oooops!");
          });
    }
  }
  
   
        }
}
