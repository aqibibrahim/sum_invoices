import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform,LoadingController, ToastController } from 'ionic-angular';
import {CreateInvoicesPage} from '../create-invoices/create-invoices';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import {Http ,Response} from '@angular/http';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
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
  letterObj = {
    to: '',
    from: '',
    text: ''
  }
  invoices:any;
  pdfObj = null;
  constructor(public navCtrl: NavController, public navParams: NavParams,private plt: Platform, public http: Http,private file: File, private fileOpener: FileOpener,public loadingCtrl: LoadingController, public tostctrl: ToastController) {
    this.http.get('https://sum-finance.herokuapp.com/invoice/get-all').map(res => res.json()).subscribe(data => {
      console.log(data);
         //this.posts = data.json();
         this.invoices = data 
         // for(var i=0;i<result.data.length;i++){
         //   this.posts = result.data[i].first_name;
         //   console.log(this.posts);
         // }
       });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoicesPage');
  }
  createinvoice(){

    this.navCtrl.push(CreateInvoicesPage);
 }
 ionViewDidEnter() {
  this.http.get('https://sum-finance.herokuapp.com/invoice/get-all').map(res => res.json()).subscribe(data => {
    console.log(data);
       //this.posts = data.json();
       this.invoices = data 
       // for(var i=0;i<result.data.length;i++){
       //   this.posts = result.data[i].first_name;
       //   console.log(this.posts);
       // }
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
  this.http.post('https://sum-finance.herokuapp.com/invoice/delete/'+invoice._id+'', data)
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
}
