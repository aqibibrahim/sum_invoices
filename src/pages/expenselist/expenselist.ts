import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController,Platform, AlertController } from 'ionic-angular';
import {Http ,Response } from '@angular/http';
import {HomePage} from '../home/home';
import { CreateTaxPage } from '../create-tax/create-tax';
import { App } from 'ionic-angular';
import {EditTaxPage} from '../edit-tax/edit-tax';
import {GlobalProvider} from '../../providers/global/global';
import {CompanytaxPage} from '../companytax/companytax';
import { ExpensePage } from '../expense/expense';
import {EditexpensePage} from '../editexpense/editexpense';
/**
 * Generated class for the ExpenselistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-expenselist',
  templateUrl: 'expenselist.html',
})
export class ExpenselistPage {
alert:any;
record:any;
expensename:any;
expensevalue:any;
itemname:any;
date:any;
  constructor(public navCtrl: NavController,public global:GlobalProvider, public plt:Platform,public alertCtrl:AlertController,public navParams: NavParams,public http: Http,public app: App,public platform:Platform,public loadingCtrl: LoadingController, public tostctrl: ToastController) {
    let loader = this.loadingCtrl.create({
      content:'Waiting...'
    });
    loader.present();
    //http://localhost:3000/expense/getByUserId/5d5bebdc785c65001733f219
    this.http.get('https://sum-invoice-app.herokuapp.com/expense/getByUserId/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
      console.log(data);
      if(data.length == 0){
        this.alert = this.alertCtrl.create({
          title: 'Oh Snap!',
          message: 'We do not have any Expense for this company',
          buttons: [{
              text: ' Add your first Expense',
              handler: () => {
               this.navCtrl.push(ExpensePage);
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
    console.log('ionViewDidLoad ExpenselistPage');
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
  createexpense(){
    this.navCtrl.push(ExpensePage);
  }
  ionViewDidEnter() {
    this.http.get('https://sum-invoice-app.herokuapp.com/expense/getByUserId/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
      console.log(data);
          this.record = data 
          console.log(this.record)
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
  removeItem(expense):void{


    const alert = this.alertCtrl.create({
      title: 'Expense Delete',
      message: 'Do you Want to Delete this Expense',
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
              expenseId:expense._id
            }
            this.http.post('https://sum-invoice-app.herokuapp.com/expense/delete', data)
            .subscribe(res => {
              
              loader.dismiss();
                    let toast = this.tostctrl.create({
                      message:'Expense Delete Successfully',
                      duration:2000
                    });
                    toast.present();
              this.ionViewDidEnter();
            }, err => {
              loader.dismiss();
                    let toast = this.tostctrl.create({
                      message:'Expense not Delete',
                      duration:2000
                    });
                    toast.present();
             
            });
          }
      }]
  });
  alert.present();
  }
  editexpense(expense):void {
    //console.log(item.title);
    console.log(expense._id);
    this.navCtrl.push(EditexpensePage,{id:expense._id})
}
}
