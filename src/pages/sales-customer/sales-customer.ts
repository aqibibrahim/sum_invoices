import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform,ActionSheetController,LoadingController,ToastController   } from 'ionic-angular';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet/ngx';
import {Http ,Response} from '@angular/http';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import {GlobalProvider} from '../../providers/global/global';
import {SalesbycustomerreportPage} from '../salesbycustomerreport/salesbycustomerreport';
/**
 * Generated class for the SalesCustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sales-customer',
  templateUrl: 'sales-customer.html',
})
export class SalesCustomerPage {
  letterObj = {
    to: 'Aqib',
    from: 'Ibrahim',
    text: 'Hy its b'
  }
 
  pdfObj = null;
  namesList:any;
  gaming:any;
  fromdate:any;
  todate:any;
  customer_id:any;
  customer_name:any;
  itemname:any;
  itemquantity:any;
  totalamount:any;
  date:any;
  myDate = new Date().toISOString();
  constructor(public navCtrl: NavController,private plt: Platform,public global:GlobalProvider,public loadingCtrl: LoadingController, public tostctrl: ToastController,public http:Http, public navParams: NavParams, private file: File, private fileOpener: FileOpener,private actionSheet: ActionSheet,public actionSheetCtrl: ActionSheetController) {
    this.http.get('https://sum-finance-latest2.herokuapp.com/finance/getByUserId/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
      console.log(data);
         //this.posts = data.json();
         this.namesList = data 
 });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesCustomerPage');
  
  }
presentActionSheet() {
     {
      let actionSheet = this.actionSheetCtrl.create({
        buttons: [
          {
            text: 'Download Pdf',
            role: 'destructive',
            handler: () => {
              console.log('Destructive clicked');
              this.createPdf();
            }
          },
          
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
   
      actionSheet.present();
    }

   }
   createPdf() {
    var docDefinition = {
      content: [
        { text: 'REMINDER', style: 'header' },
        { text: new Date().toTimeString(), alignment: 'right' },
 
        { text: 'From', style: 'subheader' },
        { text: this.letterObj.from },
 
        { text: 'To', style: 'subheader' },
        this.letterObj.to,
 
        { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },
 
        {
          ul: [
            'Bacon',
            'Rips',
            'BBQ',
          ]
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
    this.downloadPdf();
  }
 
  downloadPdf() {
      console.log(this.file);
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
 
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.externalDataDirectory,'yDate', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          console.log(this.file.externalDataDirectory);
          //this.fileOpener.open(this.file.externalDataDirectory + 'myletter.pdf', 'application/pdf');
          this.fileOpener.open(this.file.externalDataDirectory + 'myletter.pdf', 'application/pdf')
  .then(() => console.log('File is opened'))
  .catch(e => console.log('Error opening file', e));
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }
  run_report_sales_by_customer(){
    if(this.todate == undefined){
      alert("Please add Due Date")
    }
    else if(this.fromdate == undefined) {
      alert("Please choose From Date");
    }

    else if(this.gaming==undefined){
      alert("Please Select Customer Name");
    }
    //console.log(this.fromdate, this.todate);
    else if(this.fromdate > this.todate)
  {
      alert ("Due Date must be greater than Invoice Date")
  }else{
         this.navCtrl.push(SalesbycustomerreportPage,{startdate:this.fromdate,enddate:this.todate,customername:this.customer_name,customerid:this.customer_id});
  }

}
onContactChange(){
  console.log(this.gaming);
  var key_id = Object.keys(this.gaming)[0];
  var key_id1 = Object.keys(this.gaming)[1];
  var key_id2 = Object.keys(this.gaming)[2];
  this.customer_id = this.gaming[key_id];
  this.customer_name = this.gaming[key_id2];

  console.log(this.customer_id,this.customer_name);
}
 }
