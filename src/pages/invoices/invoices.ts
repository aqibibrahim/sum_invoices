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
 * Generated class for the InvoicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invoices',
  templateUrl: 'invoices.html',
})
export class InvoicesPage {
  @ViewChild(Nav) nav: Nav;
  
  dateinput:any;
  output:any;
  letterObj = {
    to: '',
    from: '',
    text: ''
  }
  invoices:any;
  duedate=[];
  //selectcity = [];
  pdfObj = null;
  constructor(public navCtrl: NavController, public navParams: NavParams,public app: App,public alertCtrl:AlertController,public global:GlobalProvider,private plt: Platform, public http: Http,private file: File, private fileOpener: FileOpener,public loadingCtrl: LoadingController, public tostctrl: ToastController) {
    console.log(this.global.userid);
    this.http.get('https://sum-finance-latest2.herokuapp.com/invoice/getByUserId/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
    console.log(data);  
    if(data.length == 0){
      alert("There is no invoice genrated by this user");
    }
      this.invoices = data 
       });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoicesPage');
    
  }
 
  createinvoice(){

    this.navCtrl.push(CreateInvoicesPage);
 }
 ionViewDidEnter() {
  this.http.get('https://sum-finance-latest2.herokuapp.com/invoice/getByUserId/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
    console.log(data);
       //this.posts = data.json();
       this.invoices = data 
            });
            this.plt.registerBackButtonAction(() => {
              // Catches the active view
              let nav = this.app.getActiveNavs()[0];
              let activeView = nav.getActive();                
              // Checks if can go back before show up the alert
              if(activeView.name === 'InvoicesPage') {
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
                                this.nav.setRoot('HomePage');
                              }
                          },{
                              text: 'OK',
                              handler: () => {
                                
                                this.plt.exitApp();
                              }
                          }]
                      });
                      alert.present();
                  }
              }
          });
}
 removeItem(invoice):void{
  let loader = this.loadingCtrl.create({
    content:'Waiting...'
  });
  loader.present();
  let data={
    id:invoice._id
  }
  this.http.post(' https://sum-finance-latest2.herokuapp.com/invoice/delete/'+invoice._id+'', data)
  .subscribe(res => {
    
    loader.dismiss();
          let toast = this.tostctrl.create({
            message:'Item Delete Successfully',
            duration:2000
          });
          toast.present();
    this.ionViewDidEnter();
  }, err => {
    loader.dismiss();
          let toast = this.tostctrl.create({
            message:'Item not Delete',
            duration:2000
          });
          toast.present();
   
  });
}
edititems(invoice){
this.navCtrl.push(EditinvoicePage,{id:invoice._id});
}
}
