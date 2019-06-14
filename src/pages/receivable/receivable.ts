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
  invoices:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public app: App,public alertCtrl:AlertController,public global:GlobalProvider,private plt: Platform, public http: Http,public loadingCtrl: LoadingController, public tostctrl: ToastController) {

    let loader = this.loadingCtrl.create({
      content:'Waiting...'
    });
    loader.present();
    this.http.get('https://sum-finance-latest2.herokuapp.com/invoice/status/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
      console.log(data);  
      if(data.length == 0){
        alert("There is no invoice genrated by this user");
      }
        this.invoices = data 
        loader.dismiss();
         });
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceivablePage');
    this.plt.registerBackButtonAction(() => {
      // Catches the active view
      let nav = this.app.getActiveNavs()[0];
      let activeView = nav.getActive();                
      // Checks if can go back before show up the alert
      if(activeView.name === 'ReceivablePage') {
          if (nav.canGoBack()){
              nav.pop();
          } else {
              this.navCtrl.push(HomePage);
              
          }
      }
  });
  this.setBackButtonAction();
  }
  setBackButtonAction(){
    this.navBar.backButtonClick = () => {
    //alert("Where you want to go");
    this.navCtrl.push(HomePage);
     //this.navCtrl.pop()
    }
  }

}
