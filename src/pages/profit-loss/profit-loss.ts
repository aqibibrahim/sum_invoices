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
/**
 * Generated class for the ProfitLossPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

    @IonicPage()
    @Component({
      selector: 'page-profit-loss',
      templateUrl: 'profit-loss.html',
    })
    export class ProfitLossPage {
      @ViewChild(Nav) nav: Nav;
    fromdate:any;
    todate:any;
    item_id:any;
    itemname:string;
    item_name:any
    items:any;
    expenseamount:any;
    sale_rate:any;
    purchase_rate:any;
    quatity:any;
    discount=0;
    shipment=0;
    tax=0;
      constructor(public navCtrl: NavController,public global:GlobalProvider,public alertCtrl:AlertController,public platform:Platform,public app:App,public ionicApp:IonicApp,public loadingCtrl: LoadingController, public tostctrl: ToastController, public navParams: NavParams, public http:Http) {
        this.http.get('https://sum-invoice-app.herokuapp.com/item/getByUserId/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
          console.log(data.name);
             this.items = data 
           });
      }

      ionViewDidLoad() {
        console.log('ionViewDidLoad ProfitLossPage');
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
          if(activeView.name === 'ProfitLossPage') {
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
    run_report_profit_loss(){
      if(this.todate == undefined){
        alert("Please add Due Date")
      }
      else if(this.fromdate == undefined) {
        alert("Please choose From Date");
      }

      else if(this.itemname==undefined){
        alert("Please Select Item First");
      }
      //console.log(this.fromdate, this.todate);
      else if(this.fromdate > this.todate)
    {
        alert ("Due Date must be greater than Invoice Date")
    }else{
      let loader = this.loadingCtrl.create({
        content:'Waiting...'
      });
      loader.present();
      let data = {
        startDate:this.fromdate,
        endDate:this.todate,
        itemId:this.item_id
      }
      console.log(data);
      this.http.post('https://sum-invoice-app.herokuapp.com/expense/profitandloss', data).map(response => response.json())
        .subscribe(data => {
          //response = jQuery.parseJSON(response);
          console.log(data);
          loader.dismiss();
        if( data[0].purchaseRate == "Invoice not found for this item id"){
          let toast = this.tostctrl.create({
            message:'No Record Found',
            duration:2000
          });
          toast.present();
        }else{
          let toast = this.tostctrl.create({
            message:'Generate Report',
            duration:2000
          });
          toast.present();
          this.expenseamount = data[0].totalExp;
          this.purchase_rate = data[0].purchaserate;
          this.sale_rate = data[0].salerate;
          this.quatity = data[0].totalquantity;
          this.discount = data[0].totalDiscount;
          this.shipment = data[0].totalShipment;
          this.tax = data[0].totalTax;
          this.navCtrl.push(ProfitLossReportPage,{expenseamount:this.expenseamount,purchaserate:this.purchase_rate,salerate:this.sale_rate,quantity:this.quatity,fromdate:this.fromdate,todate:this.todate,itemname:this.item_name
          ,startdate:this.fromdate,enddate:this.todate,discount:this.discount,shiping:this.shipment,tax:this.tax});
        }
        }, error => {
        console.log("Oooops!");
        });
    }
      
 }

    onItemChange(){
      console.log(this.itemname);
      var key_id = Object.keys(this.itemname)[0];
      var key_id1 = Object.keys(this.itemname)[1];
      this.item_id = this.itemname[key_id];
      this.item_name = this.itemname[key_id1];
      console.log(this.item_id,key_id1);
    }
    }
