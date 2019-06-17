import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform,LoadingController,AlertController,Nav, ToastController,Navbar } from 'ionic-angular';
import {CreateInvoicesPage} from '../create-invoices/create-invoices';
import {EditinvoicePage} from '../editinvoice/editinvoice';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import {Http ,Response} from '@angular/http';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import {GlobalProvider} from '../../providers/global/global';
import {HomePage} from '../home/home';
import { App } from 'ionic-angular';

/**
 * Generated class for the PayablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payable',
  templateUrl: 'payable.html',
})
export class PayablePage {
  invoices:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public app: App,public alertCtrl:AlertController,public global:GlobalProvider,private plt: Platform, public http: Http,private file: File, private fileOpener: FileOpener,public loadingCtrl: LoadingController, public tostctrl: ToastController) {
    console.log(this.global.userid);
    this.http.get('https://sum-finance-latest2.herokuapp.com/invoice/payable/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
    console.log(data);  
    if(data.length == 0){
      alert("There is no invoice genrated by this user");
    }
      this.invoices = data 
       });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayablePage');
  }

}
