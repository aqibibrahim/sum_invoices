import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform,LoadingController,AlertController,Nav, ToastController,Navbar } from 'ionic-angular';
import {Http ,Response} from '@angular/http';
import {GlobalProvider} from '../../providers/global/global';
import {HomePage} from '../home/home';
import { App } from 'ionic-angular';

/**
 * Generated class for the ReceivablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receivable',
  templateUrl: 'receivable.html',
})
export class ReceivablePage {
  @ViewChild(Nav) nav: Nav;
  @ViewChild(Navbar) navBar: Navbar;
  //public sum : number = 0;
  sum:any;
  invoices:any;
  alert:any;
  fixedamount:any;
  fixedamountarray = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public app: App,public alertCtrl:AlertController,public global:GlobalProvider,private plt: Platform, public http: Http,public loadingCtrl: LoadingController, public tostctrl: ToastController) {

    let loader = this.loadingCtrl.create({
      content:'Waiting...'
    });
    loader.present();
    this.http.get('https://sum-invoice-app.herokuapp.com/invoice/status/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
      console.log(data);  
      if(data.length == 0){
        this.sum = 0;
        this.alert = this.alertCtrl.create({
          title: 'Oh Snap!',
          message: 'We do not have any Invoice for this company',
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
   
        this.invoices = data 
        this.sum = 0;
      for(var i=0;i<this.invoices.length;i++){
        this.fixedamount = this.invoices[i].total_cost;
        this.fixedamountarray.push(this.fixedamount);
        
      }
      for(let i = 0; i<this.fixedamountarray.length; i++){
        //this.sum = this.sum + this.fixedamountarray[i];    
        this.sum += Number(this.fixedamountarray[i]);
      }
      console.log(this.sum);
        loader.dismiss();
    });
        this.plt.registerBackButtonAction(() => {
          let nav = this.app._appRoot._getActivePortal() || this.app.getActiveNav();
          let activeView = nav.getActive();
      
          if (activeView != null) {
            if (nav.canGoBack()) {
              this.navCtrl.push(HomePage);
            } else if(activeView.isOverlay) {
              activeView.dismiss();
            } else {
              this.navCtrl.push(HomePage);
              //this.closeApp();
            }
         
          }  
        
  });
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceivablePage');
    this.plt.registerBackButtonAction(() => {
      let nav = this.app._appRoot._getActivePortal() || this.app.getActiveNav();
      let activeView = nav.getActive();
  
      if (activeView != null) {
        if (nav.canGoBack()) {
          this.navCtrl.push(HomePage);
        } else if(activeView.isOverlay) {
          activeView.dismiss();
        } else {
          this.navCtrl.push(HomePage);
          //this.closeApp();
        }
      }
    });
    this.navBar.backButtonClick = () => {
      //alert("Where you want to go");
      this.navCtrl.push(HomePage);
       //this.navCtrl.pop()
      }
  }
}
