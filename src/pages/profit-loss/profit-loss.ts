import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController } from 'ionic-angular';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import {Http ,Response} from '@angular/http';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import {GlobalProvider} from '../../providers/global/global';
import {ProfitLossReportPage} from '../profit-loss-report/profit-loss-report';
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
    fromdate:any;
    todate:any;
    item_id:any;
    itemname:string;
    items:any;
    expenseamount:any;
    sale_rate:any;
    purchase_rate:any;
    quatity:any;
      constructor(public navCtrl: NavController,public global:GlobalProvider,public loadingCtrl: LoadingController, public tostctrl: ToastController, public navParams: NavParams, public http:Http) {
        this.http.get('https://sum-finance-latest2.herokuapp.com/item/getByUserId/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
          console.log(data.name);
             this.items = data 
           });
      }

      ionViewDidLoad() {
        console.log('ionViewDidLoad ProfitLossPage');
      }
    run_report_profit_loss(){
      console.log(this.fromdate, this.todate);
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
      this.http.post('https://sum-finance-latest2.herokuapp.com/expense/expensedate', data).map(response => response.json())
        .subscribe(data => {
          //response = jQuery.parseJSON(response);
          loader.dismiss();
        let toast = this.tostctrl.create({
          message:'Generate Report',
          duration:2000
        });
        toast.present();
        this.navCtrl.push(ProfitLossReportPage);
          this.expenseamount = data[0].totalExp;
          this.purchase_rate = data[0].purchaseRate;
          this.sale_rate = data[0].saleRate;
          this.quatity = data[0].totalquantity;
        }, error => {
        console.log("Oooops!");
        });


      this.http.post('https://sum-finance-latest2.herokuapp.com/expense/expensedate', data)
      .subscribe(response => {
        console.log('POST Response:', response);
        loader.dismiss();
        let toast = this.tostctrl.create({
          message:'Generate Report',
          duration:2000
        });
        toast.present();
        this.navCtrl.push(ProfitLossReportPage,{expenseamount:this.expenseamount,purchaserate:this.purchase_rate,salerate:this.sale_rate,quantity:this.quatity,fromdate:this.fromdate,todate:this.todate});
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

    onItemChange(){
      console.log(this.itemname);
      var key_id = Object.keys(this.itemname)[0];
      this.item_id = this.itemname[key_id];
      console.log(this.item_id);
    }
    }
