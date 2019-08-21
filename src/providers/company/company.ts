import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Http ,Response} from '@angular/http';
import {CompanytaxPage} from '../../pages/companytax/companytax';
import {NavParams,LoadingController, ToastController,App, AlertController  } from 'ionic-angular';
/*
  Generated class for the CompanyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CompanyProvider {
  companyname:any;
  business_email:any;
  userid:any;
  country:any;
  username:any;
  postal:any;
  language:any;
  timezone:any;
  fiscal:any;
  formatt:any;
  address:any;
  emailstatus:any;
  constructor(public http: Http,public navParams: NavParams,public app:App,public loadingCtrl: LoadingController,public tostctrl: ToastController, public alrtctrl:AlertController) {
    console.log('Hello CompanyProvider Provider');
  }
    createcompany(userid,username,businessemail,businesslocation,address,postal){
      let loader = this.loadingCtrl.create({
        content:'Waiting...'
      });
      loader.present();
      let data = {
        user_id:userid,
        //companyname:companyname,
        user_name : username,
        user_country:businesslocation,
        user_url: postal,
        bussiness_location:businesslocation,
        //user_language:this.language,
        //time_zone:this.timezone,
        //date_format:this.formatt,
        //fical_year_start:this.fiscal,
        address:address,
        user_email:businessemail
  
      };

      this.http.post('https://sum-invoice-app.herokuapp.com/comp/create', data)
          .subscribe(response => {
            console.log('POST Response:', response);
            loader.dismiss();
            let toast = this.tostctrl.create({
              message:'Company Created',
              duration:2000
            });
            toast.present();
            this.app.getActiveNav().push(CompanytaxPage);
            //this.navCtrl.push(CompanytaxPage);
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
}
