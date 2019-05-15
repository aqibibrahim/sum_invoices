import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform ,LoadingController, ToastController} from 'ionic-angular';
import {InvoicedeatilsPage} from '../invoicedeatils/invoicedeatils';
import { Storage } from '@ionic/storage';
import { SMS } from '@ionic-native/sms';
import { EmailComposer } from '@ionic-native/email-composer';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import {AddLineItemPage} from '../add-line-item/add-line-item';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import {Http ,Response} from '@angular/http';
import {GlobalProvider} from '../../providers/global/global';
import {InvoicesPage} from '../invoices/invoices';
import { NativeStorage } from '@ionic-native/native-storage';
/**
 * Generated class for the CreateInvoicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-invoices',
  templateUrl: 'create-invoices.html',
})
export class CreateInvoicesPage {
  public anArray:any=[];

  value:any;

  discountprice:any;
  shippingprice:any;
  adjustmentprice:any;
  total:any;
  subtotal:any;
  amount_total:any;
  subamounttotall:any;
  purchase_rate:any;
  sale_rate:any;
  item_id:any;
  //tax:any;
  dst:any;
  shp:any;
  adj:any;

  email:any;
  invoice:any;
  order:any;

  input_name:any;
  desc:any;
  qty:any;
  rat:any;
  tax:any;
  taxtotal:any;
  x:any;
  items:any;
  amount:any;
  data=false;
  customer_notes:any;
  terms_condition:any;
  gamingname:any;
  namesList:any;

  nativename:any
  nativeemail:any;
  nativeinvoice:any;
  nativeorder:any;
  
  gaming:any;
  invoicedate:any;
  duedate:any;
  userid:any;

  letterObj = {
    to: '',
    from: '',
    text: ''
  }
  Isshowing =false;
  pdfObj = null;
  pdfnumber =2;
  constructor(public navCtrl: NavController,private nativeStorage: NativeStorage, public global:GlobalProvider,private sms: SMS,public http:Http,public loadingCtrl: LoadingController, public tostctrl: ToastController, private storage: Storage,public navParams: NavParams,public emailComposer: EmailComposer, private plt: Platform, private file: File, private fileOpener: FileOpener) {
    // this.value=navParams.get('item_name');
    // console.log(this.value);
    this.input_name = this.navParams.get('inputname');
    this.qty= this.navParams.get('quantity');
    this.rat = this.navParams.get('rate');
    this.desc = this.navParams.get('description');
    this.tax = this.navParams.get('tax');
    this.purchase_rate = this.navParams.get("purchaserate");
    this.sale_rate = this.navParams.get("sale_rate");
    this.item_id = this.navParams.get("itemid");
    console.log(this.purchase_rate,this.sale_rate,this.item_id);
    this.x='X';
    this.items = 'Items';
    this.amount = 'Amount';
    this.taxtotal = this.navParams.get('taxtotal');
    this.amount_total = this.qty*this.rat;
    
    if(this.taxtotal !== undefined){
      this.subamounttotall = +this.taxtotal;
    }
    else{
      this.subamounttotall = 0;
    }
    this.subtotal = (this.qty*this.rat)+this.subamounttotall;
    if(this.subtotal == undefined){
      this.total = 0
    }else{
      this.total = this.subtotal;
    }
    this.http.get('https://sum-finance.herokuapp.com/finance/get-all').map(res => res.json()).subscribe(data => {
     console.log(data);
        //this.posts = data.json();
        this.namesList = data 

      });
    
  }
   
  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateInvoicesPage');
    console.log(this.input_name);
    
    if(this.gaming !==undefined){
      this.storage.set('customername', this.gaming);
      this.storage.set('email', this.email);
      this.storage.set('invoice', this.invoice);
      this.storage.set('order', this.order);
    }
    if(this.gaming == undefined){
      this.storage.get('customername').then((val) => {
        console.log('Your name is', val);
      });
      this.storage.get('email').then((mail) => {
        console.log('Your email is', mail);
      });
      this.storage.get('invoice').then((invoice) => {
        console.log('Your invoice is', invoice);
      });
      this.storage.get('order').then((order) => {
        console.log('Your order is', order);
      });
    }
  }
  ionViewWillEnter(){
//     this.nativeStorage.getItem('myitem')
//   .then(
//     data => console.log(data.name),
//     data1=> console.log(data1.email),
//     error => console.error(error)
// );
  this.storage.get('name').then((val1) => {
  console.log('Your name is', val1);
  this.nativename = val1;

});
this.storage.get('email').then((val2) => {
  console.log('Your email is', val2);
  this.nativeemail = val2;

});
this.storage.get('invoiceno').then((val3) => {
  console.log('Your invoice is', val3);
  this.nativeinvoice = val3;

});
this.storage.get('orderno').then((val4) => {
  console.log('Your order is', val4);
  this.nativeorder = val4;

});


  }
  onContactChange(){
    console.log(this.gaming.email)
    this.gamingname = this.gaming.first_name;
    this.email = this.gaming.email;
  }
  onInputTime(data) : void {
    console.log("onChangeTime to time: " + this.discountprice + ". Event data: " + data);  
    this.dst = +this.discountprice;
    //this.total = this.dst + this.subtotal;  
    if(this.shp !== undefined && this.dst !== undefined){
      this.total = this.shp + this.subtotal - this.dst;  
    } 
   else if(this.adj !== undefined && this.shp !== undefined) {
      this.total =  this.shp + this.subtotal + this.adj - this.dst;  
    }
    else{
      this.total =  this.subtotal -this.dst; 
    }
  }
  onShipping(data) : void {
    console.log("onChangeTime to time: " + this.shippingprice + ". Event data: " + data); 
    this.shp = +this.shippingprice
    if(this.dst!== undefined && this.shp == undefined){
      this.total = this.subtotal - this.dst;      
    }else{
      this.total = this.shp +this.subtotal - this.dst;    
    }
  }
  onAdjustment(data) : void {
    console.log("onChangeTime to time: " + this.adjustmentprice + ". Event data: " + data);

    this.adj = +this.adjustmentprice
    if(this.dst!== undefined && this.shp!==undefined && this.adj!==undefined){
      this.total = this.adj +this.shp+ this.subtotal -this.dst;   
    }else if(this.dst==undefined && this.shp !== undefined && this.adj !== undefined){
      this.total = this.adj +this.subtotal + this.shp; 
    }
    else if(this.dst !== undefined && this.shp == undefined && this.adj !== undefined){
      this.total = this.adj+this.subtotal-this.dst
    }
    else if(this.dst !== undefined && this.shp !== undefined && this.adj == undefined){
      this.total = this.subtotal+this.shp-this.dst
    }else{
      this.total = this.adj+this.subtotal
    }
  }
  showpicker()
  {
  if(this.Isshowing){
  this.Isshowing =true
  } else{
  this.Isshowing =false
  }
  }
  isReadonly() {
    return this.isReadonly;   //return true/false 
  }
  sendEmail(){
    
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        //Now we know we can send
      }
     });
     
     let email = {
       to: 'aqibibrahim239@gmail.com',
       cc: 'jamestone.hh126@gmail.com',
       bcc: [],
       attachments: [this.file.externalDataDirectory, 'Invoice'+this.invoice+'.pdf'],
       subject: 'Cordova Icons',
       body: 'How are you? Nice greetings from Leipzig',
       isHtml: true
     };
     
     // Send a text message using default options
     this.emailComposer.open(email);
   }

   craetepdf(){
    
     this.pdfnumber ++;
     console.log(this.gaming);
     
     //public anArray:any=[];
      //var items :any= [this.input_name, this.qty, this.rat]
     var docDefinition = {


      content: [
        { text: 'INVOICE#'+ this.invoice, style: 'header'},
        { text: new Date().toTimeString(), alignment: 'right'},

        { text: 'From', style: 'subheader'},
        "Zekab",
        "Bahria Town",
        "IT Company",        

        { text: 'To', style: 'subheader'},
        this.gaming,
        this.email,
        this.order,  

        { text: 'Items', style: 'subheader'},
        {
            style: 'itemsTable',
            table: {
                widths: ['*', 75, 75],
                body: [
                    [ 
                        { text: 'Description', style: 'itemsTableHeader' },
                        
                        { text: 'Quantity', style: 'itemsTableHeader' },
                        
                        { text: 'Price', style: 'itemsTableHeader' },
                        
                    ],
                    [this.input_name,this.qty,this.rat]
                ]
            }
        },
        {
            style: 'totalsTable',
            table: {
                widths: ['*', 75, 75],
                body: [
                    [
                        '',
                        'Subtotal',
                        this.total,
                    ],
                    [
                        '',
                        'Shipping',
                        "Bahria Town"
                    ],
                    [
                        '',
                        'Total',
                        this.total
                    ]
                ]
            },
            layout: 'noBorders'
        },
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
        itemsTable: {
            margin: [0, 5, 0, 15]
        },
        itemsTableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
        },
        totalsTable: {
            bold: true,
            margin: [0, 30, 0, 0]
        }
    }
     
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);

    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
      //let filepath = this.file.externalDataDirectory;
      //let filename = Invoice'+this.invoice+'.pdf';
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.externalDataDirectory, 'Invoice'+this.invoice+'.pdf', blob, { replace: true }).then(fileEntry => {
          this.fileOpener.open(this.file.externalDataDirectory +'Invoice'+this.invoice+'.pdf', 'application/pdf')
  .then(() => console.log('File is opened'))
  .catch(e => console.log('Error opening file', e));
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
   }
   /////////Open invoice detail page/////////////////////
   invoicedetails(){
    //this.sms.send(this.namesList., 'Hello world!');
     console.log(this.invoicedate);
     let loader = this.loadingCtrl.create({
      content:'Waiting...'
    });
    loader.present();
    let data = {
      customer:this.gamingname,
      order_no:this.order,
      invoice_number:this.invoice,
      invoice_date:this.invoicedate,
      Due_date:this.duedate,
      sales_person:"Aqib",
      customer_note:this.customer_notes,
      terms_and_conditions:this.terms_condition,
      item_quantity:this.qty,
      item_discount:this.discountprice,
      total_cost:this.total,
      userId:this.global.userid,
      item_name:this.input_name,
      item_id:this.item_id,
      sale_rate:this.sale_rate,
      purchase_rate:this.purchase_rate
    }
    this.http.post('https://sum-finance-latest2.herokuapp.com/invoice/create', data)
    .subscribe(response => {
      console.log('POST Response:', response);
      loader.dismiss();
      let toast = this.tostctrl.create({
        message:'Data Save',
        duration:2000
      });
      toast.present();
  //    this.navCtrl.push(InvoicesPage);
      this.navCtrl.push(InvoicedeatilsPage,{'customername':this.gamingname,'invoice':this.invoice,'balance':this.total,'invoicedate':this.invoicedate,'duedate':this.duedate,'description':this.desc,
    'item_name':this.input_name,'subtotal':this.subtotal,'discount':this.discountprice,'shipping':this.shippingprice,'adjustment':this.adjustmentprice,'quantity':this.qty,'rate':this.rat,
  'email':this.email,'order':this.order});
   
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
     
   onCancel(){
     alert("Ha g");
     console.log(this.gaming);
   }
   adlineitem(){
    this.storage.set('name', this.gamingname);
    this.storage.set('email', this.email);
    this.storage.set('invoiceno', this.invoice);
    this.storage.set('orderno',this.order);
    // this.nativeStorage.setItem('myitem', {name: this.gamingname, email: this.email,invoiceno:this.invoice,orderno:this.order})
    // .then(
    //   () => console.log('Stored item!'),
    //   error => console.error('Error storing item', error)
    // );
    this.navCtrl.push(AddLineItemPage);
   }
   goTo(){
    console.log('this.anArray',this.anArray);
    this.data=true;
    }
  Add(){
    this.anArray.push({'value':this.value});
    }
}
