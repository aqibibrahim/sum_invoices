import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController,Platform } from 'ionic-angular';
import {Http ,Response } from '@angular/http';
import {HomePage} from '../home/home';
import { CreateTaxPage } from '../create-tax/create-tax';
import { App } from 'ionic-angular';
import {EditTaxPage} from '../edit-tax/edit-tax';
/**
 * Generated class for the TaxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tax',
  templateUrl: 'tax.html',
})
export class TaxPage {
  taxname: string;
  taxvalue: string;
  record:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public app: App,public platform:Platform,public loadingCtrl: LoadingController, public tostctrl: ToastController) {
    let loader = this.loadingCtrl.create({
      content:'Waiting...'
    });
    loader.present();

    this.http.get('https://sum-finance-latest2.herokuapp.com/tax/get-all').map(res => res.json()).subscribe(data => {
      console.log(data);
         this.record = data

         loader.dismiss();
       });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaxPage');
  }
  ionViewDidEnter(){
    this.http.get('https://sum-finance-latest2.herokuapp.com/tax/get-all').map(res => res.json()).subscribe(data => {
    console.log(data);
      
    this.record = data
       
     });
     this.platform.registerBackButtonAction(() => {
      // Catches the active view
      let nav = this.app.getActiveNavs()[0];
      let activeView = nav.getActive();                
      // Checks if can go back before show up the alert
      if(activeView.name === 'TaxPage') {
          if (nav.canGoBack()){
            this.navCtrl.push(HomePage);
          } else {
            this.navCtrl.push(HomePage);
          }
      }
  });
  }
  createctax(){
    this.navCtrl.push(CreateTaxPage);
  }
  removeItem(item):void{
    console.log(item._id);
    let loader = this.loadingCtrl.create({
      content:'Waiting...'
    });
    loader.present();
    let data={
      id:item._id
    }
    this.http.post('https://sum-finance-latest2.herokuapp.com/tax/delete/'+item._id+'', data)
    .subscribe(res => {
      
      loader.dismiss();
            let toast = this.tostctrl.create({
              message:'Item Delete Successfully',
              duration:2000
            });
            toast.present();
      this.ionViewDidEnter();
    }, err => {
      loader.dismiss();
            let toast = this.tostctrl.create({
              message:'Item not Delete',
              duration:2000
            });
            toast.present();
     
    });
  }
  edititems(item):void{
    this.navCtrl.push(EditTaxPage,{id:item._id})
  }
}
