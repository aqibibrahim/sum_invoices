import { Component,NgZone  } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController  } from 'ionic-angular';
import {HomePage} from '../home/home'
import {Http ,Response } from '@angular/http';
import * as jQuery from 'jquery';
import {GlobalProvider}  from '../../providers/global/global';
import {ForgotpasswordPage} from '../forgotpassword/forgotpassword';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private captchaPassed: boolean = false;
  private captchaResponse: string;
  email:any;
  password:any;
  data:any;
  company_name:any;
  userid:any;
  constructor(public navCtrl: NavController, public global: GlobalProvider,public navParams: NavParams,private zone: NgZone,public http: Http,public loadingCtrl: LoadingController, public tostctrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(){
   
    console.log(this.email,this.password);
    
    this.global.login(this.email, this.password);
  }
  signup(){
    alert("Please Create your account")
  }
  captchaResolved(response: string): void {

    this.zone.run(() => {
        this.captchaPassed = true;
        this.captchaResponse = response;
    });

}
forgot(){
this.navCtrl.push(ForgotpasswordPage);
}

}
