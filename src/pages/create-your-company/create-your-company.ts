import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController,App, AlertController, Platform  } from 'ionic-angular';
// import {SignupProvider} from '../../providers/signup/signup'
import { EventEmitter } from '@angular/core';
import {TaxPage} from '../tax/tax';
import {Http ,Response} from '@angular/http';
import {CompanytaxPage} from '../companytax/companytax';
import {CreateTaxPage} from '../create-tax/create-tax';
import { Network } from '@ionic-native/network';
/**
 * Generated class for the CreateYourCompanyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-your-company',
  templateUrl: 'create-your-company.html',
})
export class CreateYourCompanyPage {
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
alert:any;
  constructor(public http: Http,public navCtrl: NavController, public network:Network,public platform:Platform,public navParams: NavParams,public loadingCtrl: LoadingController,public tostctrl: ToastController, public alrtctrl:AlertController) {
    this.companyname = this.navParams.get('companyname');
    this.userid = this.navParams.get('userid');
    this.country = this.navParams.get('country');
    this.username = this.navParams.get('uname');  
    this.emailstatus = this.navParams.get('status');

    console.log(this.companyname,this.userid,this.country,this.username, this.emailstatus); 
    this.platform.ready().then(() => {
      this.platform.backButton.subscribe(9999, () => {
        document.addEventListener('backbutton', function (event) {
          event.preventDefault();
          event.stopPropagation();
          console.log('hello');
        }, false);
      });
     
    });
    
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
checkemail(){
  if(this.emailstatus == true){
    this.ionViewDidLoad();
  }
  else{
    const alert = this.alrtctrl.create({
      title: 'Verify Email Address',
      message: 'Check your email and verify',
      buttons: [{
          text: 'OK',
          handler: () => {
            this.checkemail();
          }
      }]
  });
  alert.present();
  
  }
}
  taxpage(){
    if(this.network.type === 'none'){
      this.alert = this.alrtctrl.create({
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
  }
  else{
    if(this.business_email == undefined){
      this.alert = this.alrtctrl.create({
        title: 'Oh Snap!',
        message: 'Please Enter Business Email',
        buttons: [{
            text: 'OK',
            handler: () => {
              console.log("Nothing")
            }
        }],
        cssClass: 'alertDanger'
    });
    this.alert.present();
}
    else{
 
     let data = {
        user_id:this.userid,
        user_name : this.username,
        user_country:this.country,
        user_url: this.postal,
        bussiness_location:this.country,
        user_language:this.language,
        time_zone:this.timezone,
        date_format:this.formatt,
        fical_year_start:this.fiscal,
        address:this.address,
        user_email:this.business_email
  
      };
      let loader = this.loadingCtrl.create({
        content:'Waiting...'
      });
      loader.present();
      //console.log(this.data.username);
      this.http.post('https://sum-invoice-app.herokuapp.com/comp/create', data)
          .subscribe(response => {
            console.log('POST Response:', response);
            let toast = this.tostctrl.create({
              message:'Successfully company created',
              duration:2000
              
            });
            loader.dismiss();
            toast.present();
            this.navCtrl.push(CreateTaxPage,{'userid':this.userid});
          }, error => {
            loader.dismiss();
            let toast = this.tostctrl.create({
              message:'Company not create',
              duration:2000
            });
            toast.present();
           console.log("Oooops!");
          });
      
    }
  }
    
    
  }
  isReadonly() {
    return this.isReadonly;   //return true/false 
  }
}
