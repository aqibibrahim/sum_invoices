import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {CreateInvoicesPage} from '../create-invoices/create-invoices';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
 
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
 
  pdfObj = null;
  constructor(public navCtrl: NavController, public navParams: NavParams,private plt: Platform, private file: File, private fileOpener: FileOpener) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoicesPage');
  }
  createinvoice(){

    this.navCtrl.push(CreateInvoicesPage);

    
  }
}
