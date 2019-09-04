import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController,Platform ,Navbar,IonicApp,AlertController,Nav } from 'ionic-angular';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { EmailComposer } from '@ionic-native/email-composer';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet/ngx';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { SocialSharing } from '@ionic-native/social-sharing';
import {InvoicesPage} from '../invoices/invoices';
import {GlobalProvider} from '../../providers/global/global';
import { App } from 'ionic-angular';

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
  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild(Nav) nav: Nav;
  alert:any;
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
  status:any;
  cont_title:any;
  companyname:any;
  billing_address:any;
  shipping_address:any;
  taxname:any;
  taxpercentage:any;
  discountedprice:any;
  taxpercentagevalue:any;
  pdfObj = null;
  letterObj = {
    to: '',
    from: '',
    text: ''
  }

  constructor(public navCtrl: NavController, private ionicApp: IonicApp,public alertCtrl:AlertController,public app: App,public global:GlobalProvider ,public navParams: NavParams, public platform: Platform, private socialSharing: SocialSharing,public emailComposer: EmailComposer,private plt: Platform, private file: File, private fileOpener: FileOpener,private actionSheet: ActionSheet,public actionSheetCtrl: ActionSheetController) {
  
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
      this.status = this.navParams.get('status');
      this.billing_address = this.navParams.get('billingaddress');
      this.shipping_address = this.navParams.get('shippingaddress');
      this.cont_title = this.navParams.get('contactsaln');
      this.companyname = this.navParams.get('companyname');
      this.taxname = this.navParams.get('taxname');
      this.taxpercentage = this.navParams.get('taxper');
      this.discountedprice = this.navParams.get('discountedprice');
      this.taxpercentagevalue = this.navParams.get('taxpercentage')
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
    this.craetepdf();
    
  }
  setBackButtonAction(){
    this.navBar.backButtonClick = () => {
    //alert("Where you want to go");
    this.navCtrl.push(InvoicesPage);
     //this.navCtrl.pop()
    }
  }
  ionViewDidLoad() {
   
    console.log('ionViewDidLoad InvoicedeatilsPage');
    

   //this.setBackButtonAction()
    this.platform.registerBackButtonAction(() => {
      // Catches the active view
      let nav = this.app.getActiveNavs()[0];
      let activeView = nav.getActive();  
     
    
      if(activeView.name === 'InvoicedeatilsPage') {
        
        if (nav.canGoBack()){
          //nav.set
          this.navCtrl.push(InvoicesPage)
        } else {
           console.log("Happen again gain");
        }
    } else {
    console.log("nOTHING HAPPEN")  
    }
  });
  this.setBackButtonAction();
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
             this.viewpdf();
           }
         },
         
         {
           text: 'Send Invoice',
           role: 'share',
           handler: () => {
             console.log('Cancel clicked');
             this.sharelink();
           },
           
         },
         {
          text: 'Save',
          role: 'save',
          handler: () => {
            console.log('Cancel clicked');
            this.saveinvoice();
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
    // alert("Send email");
    let dirPath = "";
    let dirName = 'DailySheet';
    if (this.platform.is('android')) {
      		dirPath = this.file.externalRootDirectory;
      	  } else if (this.platform.is('ios')) {
      		dirPath = this.file.documentsDirectory;
      	  }
          let saveDir = dirPath + '/' + dirName+ '/';
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        //Now we know we can send
      }
     });
     
     let email = {
       to: this.email,
       cc: '',
       bcc: [],
       attachments: [saveDir +'Invoice'+this.invoice_number+'.pdf'],
       subject: 'Invoice Generated for '+this.item_name+'',
       body: 'Hi '+this.companyname+' <br><br> Please find the attached invoice. <br><br> Thanks ',
       
       isHtml: true
     };
     
     // Send a text message using default options
     this.emailComposer.open(email);
   }
   sharelink(){
      //Common sharing event will open all available application to share
      let dirPath = "";
    let dirName = 'DailySheet';
    if (this.platform.is('android')) {
      		dirPath = this.file.externalRootDirectory;
      	  } else if (this.platform.is('ios')) {
      		dirPath = this.file.documentsDirectory;
      	  }
          let saveDir = dirPath + '/' + dirName+ '/';
      this.socialSharing.share('Hi '+this.companyname+ ' Please find the attached invoice.','Invoice Generated for '+this.item_name+' ', saveDir +'Invoice'+this.invoice_number+'.pdf', 'Invoice #'+this.invoice_number)
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
      { text:  this.global.company_name, style: 'compheader'},
       { text: 'INVOICE# ' + this.invoice_number, style: 'invoiceheader'},
       { text: 'Status: ' + this.status, style: 'header'},
       { text: 'Date: ' + this.invoice_date, alignment: 'right'},
   

       { text: 'To', style: 'subheader' },
       { text:  this.customer_name, style: 'subheader'},
      
       { text: 'Items', style: 'subheader'},
       {
           style: 'itemsTable',
           table: {
               widths: ['*', 75, 75,75,75],
               body: [
                   [ 
                       { text: 'Item&Description', style: 'itemsTableHeader' },
                       
                       { text: 'Quantity', style: 'itemsTableHeader' },
                       
                       { text: 'Rate', style: 'itemsTableHeader' },
                       { text: 'Amount', style: 'itemsTableHeader' },
                       
                   ],
                  
                   [this.item_name,this.quantity,this.rate, this.subtotal],
                   ['Shipping Charges','','',this.shipping],
                   ['Discount Price'+'-'+this.discount+'%','','',this.discountedprice],
                   ['Tax Price' +'-'+ this.taxpercentage +'%','','',this.taxpercentagevalue],
                   ['','','Total',this.balance]
               ]
           }
       },
       { text: 'Notes:', style: 'subheader'},
       { text: 'Thanks for Your Business', style: 'subheader'},
       
   ],
     styles: {
       header: {
           fontSize: 10,
           margin: [0, 0, 0, 10],
           alignment: 'right'
       },
       invoiceheader: {
        fontSize: 20,
        bold: true,
        margin: [0, 0, 0, 10],
        alignment: 'center',
        decoration: 'underline'
    },

       compheader: {
        fontSize: 30,
        bold: true,
        margin: [0, 0, 0, 10],

        alignment: 'left'
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
           margin: [0, 0, 0, 0],
           alignment:'center'
           
       }
   }
   
  //  footer: {
  //  columns: [
  //       {
  //           table: {
  //               widths: [ '70%','30%'],

  //               body: [
  //                   [
  //                       { text: this.email,

  //                       alignment:'left',
  //                       fontSize: 20,

  //                       },

  //                       { text: '',

                          
  //                           alignment:'right',
  //                           fontSize: 20,
  //                           fillColor: 'gray'}
  //                   ]
  //               ]
  //           },
  //           layout: 'noBorders'
  //       }

  //   ],
  //   margin: [0, 0, 0, 0]
  // }
}
this.pdfObj = pdfMake.createPdf(docDefinition);
if (this.plt.is('cordova')) {
  this.pdfObj.getBuffer((buffer) => {
    var utf8 = new Uint8Array(buffer); // Convert to UTF-8...
	  let binaryArray = utf8.buffer; // Convert to Binary...

	  let dirPath = "";
	  if (this.platform.is('android')) {
		dirPath = this.file.externalRootDirectory;
	  } else if (this.platform.is('ios')) {
		dirPath = this.file.documentsDirectory;
	  }

	  let dirName = 'DailySheet';
    this.file.createDir(dirPath, dirName, true).then((dirEntry) => {
      let saveDir = dirPath + '/' + dirName + '/';
      this.file.createFile(saveDir, 'Invoice'+this.invoice_number+'.pdf', true).then((fileEntry) => {
        fileEntry.createWriter((fileWriter) => {
        fileWriter.onwriteend = () => {
          this.alert = this.alertCtrl.create({
            title: 'Oh Great!',
            message: 'Invoice Generate Successfully',
            buttons: [{
                text: 'OK',
                handler: () => {
                  //this.navCtrl.push(CreateInvoicesPage);
                }
            }],
            cssClass: 'alertDanger'
        });
        this.alert.present();
        };
        fileWriter.onerror = (e) => {
          //this.hideLoading();
          console.log('Cannot write report');
        };
        fileWriter.write(binaryArray);
        });
      }).catch((error) => { console.log('Cannot create file', error); });
      }).catch((error) => { console.log('Cannot create folder', error); });
    });
  }
  else{
    this.pdfObj.download();
  }
 
 }
 

  saveinvoice(){
    
  }
  viewpdf(){
    // this.fileOpener.open(this.file.externalDataDirectory +'Invoice'+this.invoice_number+'.pdf', 'application/pdf')
    // .then(() => console.log('File is opened'))
    // .catch(e => console.log('Error opening file', e));
    let dirPath = "";
    let dirName = 'DailySheet';
    if (this.platform.is('android')) {
      		dirPath = this.file.externalRootDirectory;
      	  } else if (this.platform.is('ios')) {
      		dirPath = this.file.documentsDirectory;
      	  }
          let saveDir = dirPath + '/' + dirName+ '/';
          
          this.fileOpener.open(saveDir + 'Invoice'+this.invoice_number+'.pdf', 'application/pdf')
				  .then(() => console.log('File is opened'))
          .catch(e => 
            this.alert = this.alertCtrl.create({
              title: 'Oh Great!',
              message: e.message,
              buttons: [{
                  text: 'OK',
                  handler: () => {
                    //this.navCtrl.push(CreateInvoicesPage);
                  }
              }],
              cssClass: 'alertDanger'
          }));
          this.alert.present();
            
			}
    // this.fileOpener.open(saveDir + 'Invoice'+this.invoice_number+'.pdf', 'application/pdf')
		// 		  .then(() => console.log('File is opened'))
		// 		  .catch(e => console.log('Error openening file', e));
		// 	};
  }

