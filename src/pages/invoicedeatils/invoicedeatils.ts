import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController,Platform } from 'ionic-angular';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { EmailComposer } from '@ionic-native/email-composer';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet/ngx';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { l } from '@angular/core/src/render3';
import { isRightSide } from 'ionic-angular/umd/util/util';
import { SocialSharing } from '@ionic-native/social-sharing';
/**
 * Generated class for the InvoicedeatilsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invoicedeatils',
  templateUrl: 'invoicedeatils.html',
})
export class InvoicedeatilsPage {

  invoice_date:any;
  due_date:any;
  customer_name:any;
  balance:any;
  invoice_number:any;
  description:any;
  subtotal:any;
  discount:any;
  shipping:any;
  adjustment:any;
  item_name:any;
  quantity:any;
  rate:any;
  email:any;
  order_number:any;


  pdfObj = null;
  letterObj = {
    to: '',
    from: '',
    text: ''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,  private socialSharing: SocialSharing,public emailComposer: EmailComposer,private plt: Platform, private file: File, private fileOpener: FileOpener,private actionSheet: ActionSheet,public actionSheetCtrl: ActionSheetController) {
  
    // Getting Parameter Value from cREATE iNVOICE pAGE
      this.customer_name = this.navParams.get('customername');
      this.invoice_number = this.navParams.get('invoice');
      this.balance=this.navParams.get('balance');
      this.invoice_date = this.navParams.get('invoicedate'); 
      this.due_date = this.navParams.get('duedate');   
      this.description = this.navParams.get('description');
      this.subtotal = this.navParams.get('subtotal');
      this.discount = this.navParams.get('discount');
      this.shipping = this.navParams.get('shipping');
      this.adjustment = this.navParams.get('adjustment');
      this.item_name = this.navParams.get('item_name');
      this.quantity = this.navParams.get('quantity');
      this.rate = this.navParams.get('rate');
      this.email = this.navParams.get('email');
      this.order_number = this.navParams.get('order');

  console.log("Customer Name:"+this.customer_name,"Email:"+this.email);
  
    
    if(this.shipping == undefined){
      this.shipping = 0.00;
    }
    else{
      this.shipping = this.shipping;
    }
    if(this.discount == undefined){
      this.discount = 0.00;
    }
    else{
      this.discount = this.discount;
    }
    if(this.adjustment == undefined){
      this.adjustment = 0.00;
    }
    else{
      this.adjustment = this.adjustment;
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoicedeatilsPage');
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
             this.craetepdf();
           }
         },
         
         {
           text: 'Share Link',
           role: 'share',
           handler: () => {
             console.log('Cancel clicked');
             this.sharelink();
           },
           
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
  sendEmail(){
    alert("Send email");
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        //Now we know we can send
      }
     });
     
     let email = {
       to: 'aqibibrahim239@gmail.com',
       cc: 'jamestone.hh126@gmail.com',
       bcc: [],
       attachments: [this.file.externalDataDirectory +'Invoice'+this.invoice_number+'.pdf'],
       subject: 'Cordova Icons',
       body: 'How are you? Nice greetings from Leipzig',
       isHtml: true
     };
     
     // Send a text message using default options
     this.emailComposer.open(email);
   }
   sharelink(){
      //Common sharing event will open all available application to share
      this.socialSharing.share("Message","Subject", this.file.externalDataDirectory +'Invoice'+this.invoice_number+'.pdf', this.invoice_number)
        .then((entries) => {
          console.log('success ' + JSON.stringify(entries));
        })
        .catch((error) => {
          alert('error ' + JSON.stringify(error));
        });
   
}
  //  Create Pdf

  craetepdf(){
    
    var docDefinition = {


     content: [
       { text: 'INVOICE#'+ this.invoice_number, style: 'header'},
       { text: new Date().toTimeString(), alignment: 'right'},

       { text: 'From', style: 'subheader'},
       "Zekab",
       "Bahria Town",
       "IT Company",        

       { text: 'To', style: 'subheader' },
       this.customer_name,
       this.email,
       this.order_number, 
       
       
       { text: 'Invoice Date:', style: 'inoices', alignment: 'right' },
       {text:this.invoice_date, alignment:'right'},
       { text: 'Due Date:', style: 'inoices', alignment: 'right' },
       {text:this.due_date, alignment:'right'},
       { text: 'P.O #:', style: 'inoices', alignment: 'right' },
       {text:this.order_number, alignment:'right'},
       

       { text: 'Items', style: 'subheader'},
       {
           style: 'itemsTable',
           table: {
               widths: ['*', 75, 75,75],
               body: [
                   [ 
                       { text: 'Item&Description', style: 'itemsTableHeader' },
                       
                       { text: 'Quantity', style: 'itemsTableHeader' },
                       
                       { text: 'Rate', style: 'itemsTableHeader' },
                       { text: 'Amount', style: 'itemsTableHeader' },
                       
                   ],
                   [this.item_name,this.quantity,this.rate, this.subtotal]
               ]
           }
       },
       {
           style: 'totalsTable',
           table: {
               widths: ['*', 75,75,75,75],
               body: [
                   [
                       '',
                       'Subtotal',
                       this.subtotal,
                      
                   ],
                   [
                       '',
                       'Shipping',
                       this.shipping,
                   ],
                   [
                       '',
                       'Adjustment',
                       this.adjustment
                   ],
                   [
                     '',
                     'Total',
                      this.balance
                   ],
                   [
                     '',
                     'Balance Due',
                      this.balance
                   ]
               ]
           },
           
           layout: 'noBorders'
       },
       { text: 'Notes:', style: 'subheader'},
       { text: 'Thanks for Your Business', style: 'subheader'},
   ],
     styles: {
       header: {
           fontSize: 20,
           bold: true,
           margin: [0, 0, 0, 10],
           alignment: 'right'
       },
       subheader: {
           fontSize: 16,
           bold: true,
           margin: [0, 20, 0, 5]
       },
       inoices: {
        fontSize: 16,
        bold: true,
        margin: [0, 20, 0, 5]
    },
       
       itemsTable: {
           margin: [0, 5, 0, 15]
       },
       itemsTableHeader: {
           bold: true,
           fontSize: 13,
           color: 'black',
           
       },
       totalsTable: {
          //margin: 2%,
        
           bold: true,
           margin: [2, 2, 2, 2],
           alignment:'right'
           
       }
   }
     
   }
   this.pdfObj = pdfMake.createPdf(docDefinition);

   if (this.plt.is('cordova')) {
     this.pdfObj.getBuffer((buffer) => {
       var blob = new Blob([buffer], { type: 'application/pdf' });
       this.file.writeFile(this.file.externalDataDirectory, 'Invoice'+this.invoice_number+'.pdf', blob, { replace: true }).then(fileEntry => {
         this.fileOpener.open(this.file.externalDataDirectory +'Invoice'+this.invoice_number+'.pdf', 'application/pdf')
 .then(() => console.log('File is opened'))
 .catch(e => console.log('Error opening file', e));
       })
     });
   } else {
     // On a browser simply use download!
     this.pdfObj.download();
   }
  }
}
