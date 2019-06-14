import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Http ,Response} from '@angular/http';
import { IonicPage, Nav, NavParams,LoadingController, ToastController,App, AlertController  } from 'ionic-angular';
import {CreateYourCompanyPage} from '../../pages/create-your-company/create-your-company';
/*
  Generated class for the SignupProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SignupProvider {
  company_name:any;
  userid:any;
  countryname:any;
  user_name:any;
  user_email:any;
  constructor(public http: Http,public loadingCtrl: LoadingController, public app: App,public tostctrl: ToastController, public alrtctrl:AlertController) {
    console.log('Hello SignupProvider Provider');
  }
signup(email,password,companyname,fullname,country){
  console.log(country.name);
 let data = {
    email:email,
    password: password,
    company_name: companyname,
    user_name:fullname,
    country:country.name
};
  let loader = this.loadingCtrl.create({
      content:'Waiting...'
    });
    loader.present();
    
  this.http.post('https://sum-finance-latest2.herokuapp.com/user/signup', data).map(response => response.json())
  .subscribe(data => {
    console.log('POST Response:', data);
    console.log(data.company_name)
    this.company_name = data.company_name;
    this.userid = data._id;
    this.countryname = data.country;
    this.user_name = data.user_name;
    this.user_email = data.email;
   let toast = this.tostctrl.create({
          message:'Signup Successfully',
          duration:2000
        });
        this.app.getActiveNav().push(CreateYourCompanyPage,{companyname:this.company_name,userid:this.userid,country:this.countryname,uname:this.user_name});
        loader.dismiss();
        toast.present();
  }, error => {
    let toast = this.tostctrl.create({
      message:'User already exist',
      duration:2000
    });
    loader.dismiss();
    toast.present();
  });
}
}
