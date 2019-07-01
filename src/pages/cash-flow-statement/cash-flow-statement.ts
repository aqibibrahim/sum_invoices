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
import {CashFlowReportPage} from '../cash-flow-report/cash-flow-report';
/**
 * Generated class for the CashFlowStatementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cash-flow-statement',
  templateUrl: 'cash-flow-statement.html',
})
export class CashFlowStatementPage {
  fromdate:any;
  todate:any;
  constructor(public navCtrl: NavController,public global:GlobalProvider,public alertCtrl:AlertController,public platform:Platform,public app:App,public ionicApp:IonicApp,public loadingCtrl: LoadingController, public tostctrl: ToastController, public navParams: NavParams, public http:Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CashFlowStatementPage');
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
          if(activeView.name === 'CashFlowStatementPage') {
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
  run_report_cash_flow(){
    this.navCtrl.push(CashFlowReportPage,{userid:this.global.userid,startdate:this.fromdate,enddate:this.todate});
  }
}
