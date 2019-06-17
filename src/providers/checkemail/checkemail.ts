import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Http ,Response} from '@angular/http';
import { IonicPage, Nav, NavParams,LoadingController, ToastController, AlertController} from 'ionic-angular';
import {CreateContactPage} from '../../pages/create-contact/create-contact';
import {GlobalProvider} from '../global/global';
import {ContactsPage} from '../../pages/contacts/contacts';
import {NavController,App} from "ionic-angular/index";

/*
  Generated class for the CheckemailProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()

export class CheckemailProvider {
  
  other_user_id:any;
  mainresponse:any;

  private navCtrl:NavController;
  constructor(public http: Http, public global:GlobalProvider,public loadingCtrl: LoadingController, public tostctrl: ToastController, public app:App) {
    console.log('Hello CheckemailProvider Provider');

  }
checkemail(email,gaming,firstname,lastname,companyname,contactdisplay,phone,mobile,sexe,currency,payment,language,billingaddress,shippingaddress){
  let loader = this.loadingCtrl.create({
    content:'Waiting...'
  });
  loader.present();
  this.http.get('https://sum-finance-latest2.herokuapp.com/user/searchuser/'+email+'').map(res => res.json()).subscribe(data => {
    
    console.log(data);
    this.mainresponse = data;  
    //loader.dismiss();
    if(this.mainresponse.length == 0){
      alert("There is no User Exist");
      //this.other_user_id = null;
      let data1 = {
        cont_saln:gaming,
        first_name: firstname,
        last_name:lastname,
        comp_name:companyname,
        display_name:contactdisplay,
        email:email,
        phone:phone,
        mobile:mobile,
        cont_type:sexe,
        currency:currency,
        payment:payment,
        language:language,
        userId:this.global.userid,
        billing_address:billingaddress,
        shipping_address:shippingaddress,
        other_user_id:null
    };

      this.http.post('https://sum-finance-latest2.herokuapp.com/finance/create', data1)
          .subscribe(response => {
            console.log('POST Response:', response);
            loader.dismiss();
            let toast = this.tostctrl.create({
              message:'Data Save',
              duration:2000
            });
            let nav = this.app.getActiveNav();
            // let nav = this.app.getActiveNavs()[0];
            // let activeView = nav.getActive();  
           // this.navCtrl.push(ContactsPage);
            nav.push(ContactsPage);
          }, error => {
            loader.dismiss();
            let toast = this.tostctrl.create({
              message:'Data not Save',
              duration:2000
            });
            toast.present();
          console.log("Oooops!");
          });
              loader.dismiss();
    }
    else{
      this.other_user_id = data[0].user_comp_id 
      let data1 = {
        cont_saln:gaming,
        first_name: firstname,
        last_name:lastname,
        comp_name:companyname,
        display_name:contactdisplay,
        email:email,
        phone:phone,
        mobile:mobile,
        cont_type:sexe,
        currency:currency,
        payment:payment,
        language:language,
        userId:this.global.userid,
        billing_address:billingaddress,
        shipping_address:shippingaddress,
        other_user_id:this.other_user_id
    };

      this.http.post('https://sum-finance-latest2.herokuapp.com/finance/create', data1)
          .subscribe(response => {
            console.log('POST Response:', response);
            loader.dismiss();
            let toast = this.tostctrl.create({
              message:'Data Save',
              duration:2000
            });
            let nav = this.app.getActiveNav();
            // let nav = this.app.getActiveNavs()[0];
            // let activeView = nav.getActive();  
           // this.navCtrl.push(ContactsPage);
            nav.push(ContactsPage);
          }, error => {
            loader.dismiss();
            let toast = this.tostctrl.create({
              message:'Data not Save',
              duration:2000
            });
            toast.present();
          console.log("Oooops!");
          });
              loader.dismiss();
    }
  });
  
  }

}
