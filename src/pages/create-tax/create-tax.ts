import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController } from 'ionic-angular';
import {Http ,Response } from '@angular/http';
import {HomePage} from '../home/home';
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
  taxvalue: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public loadingCtrl: LoadingController, public tostctrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaxPage');
  }
  savedata(){
    let loader = this.loadingCtrl.create({
      content:'Waiting...'
    });
    loader.present();
    let data = {
      tax_name:this.taxname,
      tax_precentage: this.taxvalue,
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
