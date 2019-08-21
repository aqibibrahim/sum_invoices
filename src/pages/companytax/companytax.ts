import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController,AlertController } from 'ionic-angular';
import {Http ,Response } from '@angular/http';
import {LoginPage} from '../login/login';
import {HomePage} from '../home/home';
import {GlobalProvider} from '../../providers/global/global'
/**
 * Generated class for the CompanytaxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-companytax',
  templateUrl: 'companytax.html',
})
export class CompanytaxPage {
taxname:any;
taxvalue:any;
alert: any
  constructor(public navCtrl: NavController,private global: GlobalProvider, public alertCtrl:AlertController , public navParams: NavParams,public http: Http,public loadingCtrl: LoadingController, public tostctrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanytaxPage');
  }
  homepage(){
    if(this.taxname == undefined || this.taxvalue == undefined || this.taxvalue == 0){

       this.alert = this.alertCtrl.create({
        title: 'Attention',
        message: 'Please Add Actual Tax then move to next screen',
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
              message:'Tax Add Succesfully in your system',
              duration:2000
            });
            toast.present();
            this.navCtrl.push(HomePage);
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
