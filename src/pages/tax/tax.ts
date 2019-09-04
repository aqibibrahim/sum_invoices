import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController,Platform, AlertController } from 'ionic-angular';
import {Http ,Response } from '@angular/http';
import {HomePage} from '../home/home';
import { CreateTaxPage } from '../create-tax/create-tax';
import { App } from 'ionic-angular';
import {EditTaxPage} from '../edit-tax/edit-tax';
import {GlobalProvider} from '../../providers/global/global';
import {CompanytaxPage} from '../companytax/companytax';
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
  alert:any;
  
  constructor(public navCtrl: NavController,public global:GlobalProvider, public alertCtrl:AlertController,public navParams: NavParams,public http: Http,public app: App,public platform:Platform,public loadingCtrl: LoadingController, public tostctrl: ToastController) {
    let loader = this.loadingCtrl.create({
      content:'Waiting...'
    });
    loader.present();

    this.http.get('https://sum-invoice-app.herokuapp.com/tax/getByUserId/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
      console.log(data);
      if(data.length == 0){
        this.alert = this.alertCtrl.create({
          title: 'Oh Snap!',
          message: 'We do not have any Tax for this company',
          buttons: [{
              text: 'Please Add your first Tax',
              handler: () => {
               this.navCtrl.push(CompanytaxPage);
              }
          }],
          cssClass: 'alertDanger'
      });
      this.alert.present();
    
       
      }
      this.record = data

      loader.dismiss();
     
  });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaxPage');
    this.platform.registerBackButtonAction(() => {
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
  ionViewDidEnter(){
    this.http.get('https://sum-invoice-app.herokuapp.com/tax/getByUserId/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
    console.log(data);
      
    this.record = data
       
     });
     this.platform.registerBackButtonAction(() => {
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

  myHandlerFunction(){
   
    this.alert.dismiss();
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
     }
  createctax(){
    this.navCtrl.push(CompanytaxPage);
  }
  removeItem(item):void{

    const alert = this.alertCtrl.create({
      title: 'Tax Delete',
      message: 'Do you Want to Delete this tax',
      buttons: [{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
                              }
      },{
          text: 'OK',
          handler: () => {
            let loader = this.loadingCtrl.create({
              content:'Waiting...'
            });
            loader.present();
            let data={
              id:item._id
            }
            this.http.post('https://sum-invoice-app.herokuapp.com/tax/delete/'+item._id+'', data)
            .subscribe(res => {
              
              loader.dismiss();
                    let toast = this.tostctrl.create({
                      message:'Tax Delete Successfully',
                      duration:2000
                    });
                    toast.present();
              this.ionViewDidEnter();
            }, err => {
              loader.dismiss();
                    let toast = this.tostctrl.create({
                      message:'Tax not Deleted',
                      duration:2000
                    });
                    toast.present();
             
            });
          }
      }]
  });
  alert.present();
  }
  edititems(item):void{
    this.navCtrl.push(EditTaxPage,{id:item._id})
  }
}
