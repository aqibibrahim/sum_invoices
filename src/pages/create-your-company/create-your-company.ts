import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController,App, AlertController, Platform  } from 'ionic-angular';
// import {SignupProvider} from '../../providers/signup/signup'
import { EventEmitter } from '@angular/core';
import {TaxPage} from '../tax/tax';
import {Http ,Response} from '@angular/http';
import {CompanytaxPage} from '../companytax/companytax';
import {CreateTaxPage} from '../create-tax/create-tax';

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
  constructor(public http: Http,public navCtrl: NavController, public platform:Platform,public navParams: NavParams,public loadingCtrl: LoadingController,public tostctrl: ToastController, public alrtctrl:AlertController) {
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
  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     this.platform.backButton.subscribeWithPriority(9999, () => {
  //       document.addEventListener('backbutton', function (event) {
  //         event.preventDefault();
  //         event.stopPropagation();
  //         console.log('hello');
  //       }, false);
  //     });
  //     //this.statusBar.styleDefault();
  //   });
  // }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateYourCompanyPage');
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
    if(this.business_email == undefined){
      alert("Please Add Business Email");
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
              message:'Company Created',
              duration:2000
              
            });
            loader.dismiss();
            toast.present();
            this.navCtrl.push(CreateTaxPage);
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
  isReadonly() {
    return this.isReadonly;   //return true/false 
  }
}
