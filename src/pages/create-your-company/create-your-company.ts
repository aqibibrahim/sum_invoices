import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController,App, AlertController  } from 'ionic-angular';
import {SignupProvider } from '../../providers/signup/signup';
import {TaxPage} from '../tax/tax';
import {Http ,Response} from '@angular/http';
import {CompanytaxPage} from '../companytax/companytax';

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

  constructor(public http: Http,public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,public tostctrl: ToastController, public alrtctrl:AlertController) {
    this.companyname = this.navParams.get('companyname');
    this.userid = this.navParams.get('userid');
    this.country = this.navParams.get('country');
    this.username = this.navParams.get('uname');   
    console.log(this.companyname,this.userid,this.country,this.username); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateYourCompanyPage');
  }

  taxpage(){
    if(this.business_email == undefined){
      alert("Please Add Business Email");
}
    else{
      let loader = this.loadingCtrl.create({
        content:'Waiting...'
      });
      loader.present();
      //this.afd.list('Books/Books').push({name:this.name});
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
      //console.log(this.data.username);
      this.http.post('https://sum-finance-latest2.herokuapp.com/comp/create', data)
          .subscribe(response => {
            console.log('POST Response:', response);
            loader.dismiss();
            let toast = this.tostctrl.create({
              message:'Company Created',
              duration:2000
            });
            toast.present();
            this.navCtrl.push(CompanytaxPage);
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
