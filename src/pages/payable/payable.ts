import { Component,ViewChild,NgModule  } from '@angular/core';
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
import { PipesModule } from '../../pipes/pipes.module';

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
  @ViewChild(Navbar) navBar: Navbar;
  public sum : number = 0;
  invoices:any;
  fixedamount:any;
  alert:any;
  fixedamountarray = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public app: App,public alertCtrl:AlertController,public global:GlobalProvider,private plt: Platform, public http: Http,private file: File, private fileOpener: FileOpener,public loadingCtrl: LoadingController, public tostctrl: ToastController) {
    console.log(this.global.userid);
    this.http.get('https://sum-invoice-app.herokuapp.com/invoice/payable/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
    console.log(data);  
    if(data.length == 0){
      this.sum = 0;
      this.alert = this.alertCtrl.create({
        title: 'Oh Snap!',
        message: 'We do not have any Item for this company',
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
    });
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayablePage');
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
