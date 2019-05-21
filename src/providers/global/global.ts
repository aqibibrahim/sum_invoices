import { HttpClient } from '@angular/common/http';
import { Injectable,ViewChild } from '@angular/core';
import {Http ,Response} from '@angular/http';
import {HomePage} from '../../pages/home/home';
import { IonicPage, Nav, NavParams,LoadingController, ToastController,App  } from 'ionic-angular';
/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {
  //@ViewChild(Nav) nav: Nav;
company_name:any;
userid:any;
  constructor(public http: Http,public loadingCtrl: LoadingController, public app: App,public tostctrl: ToastController) {
    console.log('Hello GlobalProvider Provider');

  }
login(email,password){
    console.log(email,password);
    let data = {
      email:email,
      password:password
  };
  this.http.post('https://sum-finance-latest2.herokuapp.com/user/login', data).map(response => response.json())
        .subscribe(data => {
          console.log(data);
          console.log(data[0].company_name, data[0]._id);
          this.company_name = data[0].company_name;
          this.userid = data[0]._id;
          let toast = this.tostctrl.create({
                message:'Login Successfully',
                duration:2000
              });
              toast.present();
              this.app.getActiveNav().push(HomePage,{companyname:this.company_name,userid:this.userid});
               //this.nav.push(HomePage,{companyname:this.company_name,userid:this.userid});
          //this.navCtrl.push(HomePage,{companyname:this.company_name,userid:this.userid});
        }, error => {
          let toast = this.tostctrl.create({
            message:'Login Fail',
            duration:2000
          });
          toast.present();
          console.log("Oooops!");
        });
  }

}
