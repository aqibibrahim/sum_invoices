import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController,AlertController } from 'ionic-angular';
import {Http ,Response } from '@angular/http';
import {HomePage} from '../home/home';
import {GlobalProvider} from '../../providers/global/global';
import {LoginPage} from '../login/login';
import {SignupProvider} from '../../providers/signup/signup';
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
  constructor(public navCtrl: NavController, public alertCtrl:AlertController,private global: SignupProvider, public navParams: NavParams,public http: Http,public loadingCtrl: LoadingController, public tostctrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaxPage');
  }
  savedata(){ 

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
        userId:this.global.userid
    };
      //console.log(this.data.username);
      this.http.post('https://sum-invoice-app.herokuapp.com/tax/create', data)
          .subscribe(response => {
            console.log('POST Response:', response);
            loader.dismiss();
            let toast = this.tostctrl.create({
              message:'Data Save',
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
        login(){
          this.navCtrl.push(LoginPage);
        }
}
