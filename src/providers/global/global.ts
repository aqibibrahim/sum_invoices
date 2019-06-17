import { HttpClient } from '@angular/common/http';
import { Injectable,ViewChild } from '@angular/core';
import {Http ,Response} from '@angular/http';
import {HomePage} from '../../pages/home/home';
import { IonicPage, Nav, NavParams,LoadingController, ToastController,App, AlertController  } from 'ionic-angular';
/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {
  //@ViewChild(Nav) nav: Nav;
company_name:any;
user_email:any;
user_name:any;
userid:any;
  constructor(public http: Http,public loadingCtrl: LoadingController, public app: App,public tostctrl: ToastController, public alrtctrl:AlertController) {
    console.log('Hello GlobalProvider Provider');

  }
login(email,password){
    console.log(email,password);
    let data1 = {
      email:email,
      password:password
  };
  let loader = this.loadingCtrl.create({
    content:'Waiting...'
    
  });
  loader.present();
  this.http.post('https://sum-finance-latest2.herokuapp.com/user/login', data1).map(response => response.json())
        .subscribe(data => {
          console.log(data[0].length);
           //console.log(data[0].company_name);
           this.company_name = data.company_name;
           this.user_email = data.email;
           this.user_name = data.user_name;
          this.userid = data._id;
          this.app.getActiveNav().push(HomePage,{companyname:this.company_name,userid:this.userid});
          let toast = this.tostctrl.create({
                message:'Login Successfully',
                duration:2000
              });
              loader.dismiss();
              toast.present();
        }, error => {
          
          let alert = this.alrtctrl.create({
            title: 'Login Failed',
            subTitle: 'Invalid Username and Password',
            buttons: ['OK']
            
            });
            loader.dismiss();
            alert.present();
          
          //alert("Invalid Username and Password");
          console.log("Oooops!");
        });
  }

}
