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
import { SocialSharing } from '@ionic-native/social-sharing';


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
  @ViewChild(Navbar) navBar: Navbar;
  dateinput:any;
  alert:any;
  output:any;
  invoicenumber:any;
  letterObj = {
    to: '',
    from: '',
    text: ''
  }
  invoices:any;
  duedate=[];
  //selectcity = [];
  pdfObj = null;
  constructor(public navCtrl: NavController, public navParams: NavParams,private socialSharing: SocialSharing,public app: App,public alertCtrl:AlertController,public global:GlobalProvider,private plt: Platform, public http: Http,private file: File, private fileOpener: FileOpener,public loadingCtrl: LoadingController, public tostctrl: ToastController) {
    console.log(this.global.userid);
    this.http.get('https://sum-invoice-app.herokuapp.com/invoice/getByUserId/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
    console.log(data);  
    if(data.length == 0){
       this.alert = this.alertCtrl.create({
        title: 'Oh Snap!',
        message: 'We do not have any Invoice for this company',
        buttons: [{
            text: 'Please first add your Invoice',
            handler: () => {
              this.navCtrl.push(CreateInvoicesPage);
            }
        }],
        cssClass: 'alertDanger'
    });
    this.alert.present();
    }

    data.sort(function (a, b) {
      var key1 = a.invoice_date;
      var key2 = b.invoice_date;
  
      if (key1 < key2) {
          return -1;
      } else if (key1 == key2) {
          return 0;
      } else {
          return 1;
      }
  });
      this.invoices = data 
      console.log(this.invoices)
       });
       this.plt.registerBackButtonAction(() => {
        this.alert.dismiss();
        // Catches the active view
        let nav = this.app.getActiveNavs()[0];
        let activeView = nav.getActive();                
        // Checks if can go back before show up the alert
        if(activeView.name === 'InvoicesPage') {
            if (nav.canGoBack()){
                nav.pop();
            } else {
                this.navCtrl.push(HomePage);
                
            }
        }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoicesPage');
    this.plt.registerBackButtonAction(() => {
      this.alert.dismiss();
      // Catches the active view
      let nav = this.app.getActiveNavs()[0];
      let activeView = nav.getActive();                
      // Checks if can go back before show up the alert
      if(activeView.name === 'InvoicesPage') {
          if (nav.canGoBack()){
            this.navCtrl.push(HomePage);
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
  sharelink(invoice){
    console.log(invoice);
    //Common sharing event will open all available application to share
    this.socialSharing.share("Message","Subject", this.file.externalDataDirectory +'Invoice'+invoice.invoice_number+'.pdf', invoice.invoice_number)
      .then((entries) => {
        console.log('success ' + JSON.stringify(entries));
      })
      .catch((error) => {
        alert('error ' + JSON.stringify(error));
      });
      // this.fileOpener.open(this.file.externalDataDirectory +'Invoice'+invoice.invoice_number+'.pdf', 'application/pdf')
      // .then(() => console.log('File is opened'))
      // .catch(e => console.log('Error opening file', e));
}
  createinvoice(){

    this.navCtrl.push(CreateInvoicesPage);
 }
 ionViewDidEnter() {
  this.http.get('https://sum-invoice-app.herokuapp.com/invoice/getByUserId/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
    console.log(data);
       //this.posts = data.json();
       data.sort(function (a, b) {
        var key1 = a.invoice_date;
        var key2 = b.invoice_date;
    
        if (key1 < key2) {
            return -1;
        } else if (key1 == key2) {
            return 0;
        } else {
            return 1;
        }
    });
        this.invoices = data 
        console.log(this.invoices)
            });

           this.plt.registerBackButtonAction(() => {
      // Catches the active view
      let nav = this.app.getActiveNavs()[0];
      let activeView = nav.getActive();                
      // Checks if can go back before show up the alert
      if(activeView.name === 'InvoicesPage') {
          if (nav.canGoBack()){
            this.navCtrl.push(HomePage);
          } else {
            this.navCtrl.push(HomePage);
          }
      }
  });
}
 removeItem(invoice):void{


  const alert = this.alertCtrl.create({
    title: 'Invoice Delete',
    message: 'Do you Want to Delete this Invoice',
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
            id:invoice._id
          }
          this.http.post('https://sum-invoice-app.herokuapp.com/invoice/delete/'+invoice._id+'', data)
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
    }]
});
alert.present();
}
edititems(invoice){

this.navCtrl.push(EditinvoicePage,{id:invoice._id});
}
}
