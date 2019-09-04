import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController,AlertController, Platform } from 'ionic-angular';
import {Http ,Response } from '@angular/http';
import {HomePage} from '../home/home';
import {GlobalProvider} from '../../providers/global/global';
import {LoginPage} from '../login/login';
import { Network } from '@ionic-native/network';
// import {SignupProvider} from '../../providers/signup/signup';
/**
 * Generated class for the TaxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-tax',
  templateUrl: 'create-tax.html',
})
export class CreateTaxPage {
  taxname: string;
  taxvalue: any;
  userid:any;
  alert:any;
  constructor(public navCtrl: NavController, public network:Network,public alertCtrl:AlertController, public platform:Platform,public navParams: NavParams,public http: Http,public loadingCtrl: LoadingController, public tostctrl: ToastController) {
  this.userid = this.navParams.get('userid');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateYourCompanyPage');
    this.platform.registerBackButtonAction(function (event) {
      console.log("BackButton Pressed")
      event.preventDefault();
      
  }, 100);
  }
  ionViewDidEnter() {
    this.platform.registerBackButtonAction(function (event) {
      console.log("BackButton Pressed")
      event.preventDefault();
      
  }, 100);
}
  savedata(){ 
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
    if(this.taxname == undefined || this.taxvalue == undefined || this.taxvalue == 0){

      const alert = this.alertCtrl.create({
        title: 'Attention',
        message: 'Please Add Actual Tax then move to next screen',
        buttons: [{
            text: 'OK',
            handler: () => {
             alert.dismiss();
            }
        }],
        cssClass: 'alertDanger'
    });
    alert.present();
    }
    
    else{
      let loader = this.loadingCtrl.create({
        content:'Waiting...'
      });
      loader.present();
      let data = {
        tax_name:this.taxname,
        tax_precentage: this.taxvalue,
        userId:this.userid
    };
      //console.log(this.data.username);
      this.http.post('https://sum-invoice-app.herokuapp.com/tax/create', data)
          .subscribe(response => {
            console.log('POST Response:', response);
            loader.dismiss();
            let toast = this.tostctrl.create({
              message:'Add new Tax in your system',
              duration:2000
            });
            toast.present();
            this.navCtrl.push(LoginPage);
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
    }
        login(){
          this.navCtrl.push(LoginPage);
        }
}
