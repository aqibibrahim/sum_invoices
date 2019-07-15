import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController,private global: GlobalProvider, public navParams: NavParams,public http: Http,public loadingCtrl: LoadingController, public tostctrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanytaxPage');
  }
  homepage(){
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
    this.http.post('https://sum-finance-latest2.herokuapp.com/tax/create', data)
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
  login(){
    this.navCtrl.push(LoginPage);
  }
}
