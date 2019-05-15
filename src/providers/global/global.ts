import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Http ,Response} from '@angular/http';
import {HomePage} from '../../pages/home/home';
import { IonicPage, NavController, NavParams,LoadingController, ToastController  } from 'ionic-angular';
/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {
company_name:any;
userid:any;
  constructor(public http: Http,public loadingCtrl: LoadingController, public tostctrl: ToastController) {
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
          //response = jQuery.parseJSON(response);
          console.log(data);
          console.log(data[0].company_name, data[0]._id);
          this.company_name = data[0].company_name;
          this.userid = data[0]._id;
        }, error => {
        console.log("Oooops!");
        });
  }

}
