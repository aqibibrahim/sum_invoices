import { Component,NgZone  } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController,AlertController,Platform  } from 'ionic-angular';
import {HomePage} from '../home/home'
import {Http ,Response } from '@angular/http';
import * as jQuery from 'jquery';
import {GlobalProvider}  from '../../providers/global/global';
import {ForgotpasswordPage} from '../forgotpassword/forgotpassword';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { App } from 'ionic-angular';
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
  mailstatus:any;
  disabled = false;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public app:App,public plt:Platform,public global: GlobalProvider,public navParams: NavParams,private zone: NgZone,public http: Http,public loadingCtrl: LoadingController, public tostctrl: ToastController) {
    this.plt.registerBackButtonAction(() => {
      // Catches the active view
      let nav = this.app.getActiveNavs()[0];
      let activeView = nav.getActive();                
      // Checks if can go back before show up the alert
      if(activeView.name === 'LoginPage') {
          const alert = this.alertCtrl.create({
                  title: 'Exit',
                  message: 'Want to Exit App?',
                  buttons: [{
                      text: 'No',
                      role: 'cancel',
                      handler: () => {
                       console.log("Cancel clicked")
                                          }
                  },{
                      text: 'Yes',
                      handler: () => {
                        this.plt.exitApp();
                      }
                  }]
              });
              alert.present();
          
      }
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(){
    this.disabled = true;
    console.log(this.email,this.password);
    if(this.email == undefined && this.password == undefined){
      let alert = this.alertCtrl.create({
        title: 'Please Try Again !',
        cssClass: 'custom-alert-danger',
        message:  "Invalid Email and Password" ,
        buttons: [{
          text: 'OK',
          handler: () => {
            this.disabled = false;
          }
      }],
      });
      alert.present();  
    }

    // localStorage.email = this.email;
    // localStorage.password = this.password;
    else{
      return new Promise<any>((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(res => {
          resolve(res);
          console.log(res.user.emailVerified);
          this.mailstatus = res.user.emailVerified;
          //localStorage.mailstatus = this.mailstatus;
          this.global.login(this.email, this.password,this.mailstatus);
        }, err => {
        let alert = this.alertCtrl.create({
          title: 'Please Try Again !',
          cssClass: 'custom-alert-danger',
          message:  err ,
          buttons: [{
            text: 'OK',
            handler: () => {
              this.disabled = false;
            }
        }],
        });
        alert.present();
      });
    }
        //reject(err)
        )
    }
    
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
