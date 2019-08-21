import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController, Platform,App,IonicApp,Nav,AlertController } from 'ionic-angular';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import {Http ,Response} from '@angular/http';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import {GlobalProvider} from '../../providers/global/global';
import {ProfitLossReportPage} from '../profit-loss-report/profit-loss-report';
import { HomePage } from '../home/home';
import {ReportsPage} from '../reports/reports';
import {BalanceSheetReportPage } from '../balance-sheet-report/balance-sheet-report';

/**
 * Generated class for the BalanceSheetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-balance-sheet',
  templateUrl: 'balance-sheet.html',
})
export class BalanceSheetPage {
  fromdate:any;
  constructor(public navCtrl: NavController,public global:GlobalProvider,public alertCtrl:AlertController,public platform:Platform,public app:App,public ionicApp:IonicApp,public loadingCtrl: LoadingController, public tostctrl: ToastController, public navParams: NavParams, public http:Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BalanceSheetPage');
    this.platform.registerBackButtonAction(() => {
      // Catches the active view
      let nav = this.app.getActiveNavs()[0];
      let activeView = nav.getActive();                
      // Checks if can go back before show up the alert

      let activePortal = this.ionicApp._loadingPortal.getActive() ||
      this.ionicApp._modalPortal.getActive() ||
      this.ionicApp._toastPortal.getActive() ||
      this.ionicApp._overlayPortal.getActive();

    if (activePortal) {
      activePortal.dismiss();
    }
    else {
      if(activeView.name === 'BalanceSheetPage') {
        if (nav.canGoBack()){
            nav.pop();
        } else {
            const alert = this.alertCtrl.create({
                title: 'Exit',
                message: 'Want to Exit App?',
                buttons: [{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                      this.navCtrl.push(ReportsPage)
                    }
                },{
                    text: 'OK',
                    handler: () => {
                      
                      this.platform.exitApp();
                    }
                }]
            });
            alert.present();
        }
    }else {
      this.navCtrl.push(ReportsPage)
      }
    }
      
  });
  }
  run_report_balance_sheet(){
    if(this.fromdate ==  undefined){
      alert("Please select date first")
    }
    else{
      this.navCtrl.push(BalanceSheetReportPage,{fromdate:this.fromdate,userid:this.global.userid});
    }

  }
}
