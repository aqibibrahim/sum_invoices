import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform ,AlertController,Nav,LoadingController, ToastController,IonicApp} from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
import { ConditionalExpr } from '@angular/compiler';
import {HomePage} from '../home/home';
import { App } from 'ionic-angular';
import { CreateContactPage } from '../create-contact/create-contact';
import { CreateItemsPage } from '../create-items/create-items';
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
  @ViewChild(Nav) nav: Nav;
  registrationForm: FormGroup;
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
  customer_id:any;
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
  items1:any;
  amount:any;
  data=false;
  customer_notes:any;
  terms_condition:any;
  gamingname:any;
  namesList:any;
  paymentoption:any;
  salesperson:any;
  other_user_id:any;


  nativeindate:any
  nativeduedate:any;
  nativeinvoice:any;
  nativeorder:any;
  nativeval:any;

        /**  Add Item Variables */
        description:string;
        quantity:any;
        rate:string;
        
        itemname1:string;
        
        taxvalue:any;
        taxinput:any;
        key:string;
        value_item:any;
        value_rate:any;
        value_desc:any;
        taxrate:any;
        finalrate:any;
        itemquantity:any;
        xyz:any;
        quanitytnillrate:any;
        value_tax:any;
        taxfixedvalue:any;
        
        qtyinhands:any;
        purchase_rate1:any;
        value_key_rate:any;
        item_type:any;
        purchase_account:any;
        purchase_desc:any;
        sale_Account:any;
        sale_desc:any;
        sale_rate1:any;
        unit:any;
        value_rate1:any

        /**  Add Item Variables */

  billing_address:any;
  shipping_address:any;

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
  constructor(public navCtrl: NavController,private ionicApp: IonicApp,public platform: Platform,public alertCtrl:AlertController, public app: App,private nativeStorage: NativeStorage, public global:GlobalProvider,private sms: SMS,public http:Http,public loadingCtrl: LoadingController, public tostctrl: ToastController, private storage: Storage,public navParams: NavParams,public emailComposer: EmailComposer, private plt: Platform, private file: File, private fileOpener: FileOpener) {
    // this.value=navParams.get('item_name');
    // console.log(this.value);
    this.registrationForm = new FormGroup({
      invoice: new FormControl('', [Validators.required,Validators.minLength(1
        )]),
      order: new FormControl('', [Validators.required, Validators.minLength(1)])
      })
      
      
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
   
    if(this.value_rate == undefined){
      this.total = 0
    }else{
      this.total = this.value_rate;
    }
    this.http.get('https://sum-finance-latest2.herokuapp.com/finance/getByUserId/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
     console.log(data);
        //this.posts = data.json();
        this.namesList = data 

      });
      this.http.get('https://sum-finance-latest2.herokuapp.com/item/getByUserId/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
      console.log(data);
         this.items1 = data
       });
       this.http.get('https://sum-finance.herokuapp.com/tax/get-all').map(res => res.json()).subscribe(data => {
        console.log(data);
           this.taxvalue = data 
         });
    
  }
   
  ionViewDidLoad() {
    this.platform.registerBackButtonAction(() => {
      // Catches the active view
      let nav = this.app.getActiveNavs()[0];
      let activeView = nav.getActive();                
      // Checks if can go back before show up the alert

      let activePortal = this.ionicApp._loadingPortal.getActive() ||
      this.ionicApp._modalPortal.getActive() ||
      this.ionicApp._toastPortal.getActive() ||
      this.ionicApp._overlayPortal.getActive();

    if (activePortal) {
      activePortal.dismiss();
    }
    else {
      if(activeView.name === 'CreateInvoicesPage') {
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
                      
                      this.platform.exitApp();
                    }
                }]
            });
            alert.present();
        }
    }else {
      this.nav.setRoot('HomePage');
      }
    }
      
  });
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
    this.http.get('https://sum-finance-latest2.herokuapp.com/finance/getByUserId/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
      console.log(data);
         //this.posts = data.json();
         this.namesList = data 
 
       });
       this.http.get('https://sum-finance-latest2.herokuapp.com/item/getByUserId/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
      console.log(data);
         this.items1 = data
       });
  this.nativeinvoice = this.navParams.get('add_inno');
  this.nativeorder = this.navParams.get('add_orno');
  this.nativeindate = this.navParams.get('add_indate');
  this.nativeduedate = this.navParams.get('add_dudate');
    this.nativeval = this.navParams.get('valuesel');
  console.log(this.nativeindate,this.nativeduedate)
  this.platform.registerBackButtonAction(() => {
    // Catches the active view
    let nav = this.app.getActiveNavs()[0];
    let activeView = nav.getActive();                
    // Checks if can go back before show up the alert

    let activePortal = this.ionicApp._loadingPortal.getActive() ||
    this.ionicApp._modalPortal.getActive() ||
    this.ionicApp._toastPortal.getActive() ||
    this.ionicApp._overlayPortal.getActive();

  if (activePortal) {
    activePortal.dismiss();
  }
  else {
    if(activeView.name === 'CreateInvoicesPage') {
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
                    //this.nav.setRoot('HomePage');
                  }
              },{
                  text: 'OK',
                  handler: () => {
                    
                    this.platform.exitApp();
                  }
              }]
          });
          alert.present();
      }
  }else {
    this.nav.setRoot('HomePage');
    }
  }
    
});
  }
  opencontact(){
    this.navCtrl.push(CreateContactPage);
  }
  onContactChange(){
    console.log(this.gaming);
    console.log(this.gaming.email)
    console.log(this.gaming.other_user_id);
    console.log(this.gaming.billing_address);
    console.log(this.gaming.shipping_address);
    var key_id = Object.keys(this.gaming)[0];
    var key_id1 = Object.keys(this.gaming)[1];
    this.customer_id = this.gaming[key_id];
    console.log(key_id1);
    this.billing_address = this.gaming.billing_address;
    this.shipping_address = this.gaming.shipping_address;
    this.gamingname = this.gaming.first_name;
    this.email = this.gaming.email;
    this.other_user_id = this.gaming.other_user_id;
  }
  onInputTime(data) : void {
    console.log("onChangeTime to time: " + this.discountprice + ". Event data: " + data);  
    this.dst = +this.discountprice;
    //this.total = this.dst + this.subtotal;  
    if(this.shp !== undefined && this.dst !== undefined){
      this.total = this.shp + this.value_rate - this.dst;  
    } 
   else if(this.adj !== undefined && this.shp !== undefined) {
      this.total =  this.shp + this.value_rate + this.adj - this.dst;  
    }
    else{
      this.total =  this.value_rate -this.dst; 
    }
  }
  onShipping(data) : void {
    console.log("onChangeTime to time: " + this.shippingprice + ". Event data: " + data); 
    this.shp = +this.shippingprice
    if(this.dst!== undefined && this.shp == undefined){
      this.total = this.value_rate - this.dst;      
    }else{
      this.total = this.shp +this.value_rate - this.dst;    
    }
    
  }
  onAdjustment(data) : void {
    console.log("onChangeTime to time: " + this.adjustmentprice + ". Event data: " + data);

    this.adj = +this.adjustmentprice
    if(this.dst!== undefined && this.shp!==undefined && this.adj!==undefined){
      this.total = (this.adj +this.shp+ this.value_rate) - this.dst;   
    }
    else if(this.dst==undefined && this.shp !== undefined && this.adj !== undefined){
      this.total = this.adj +this.value_rate + this.shp; 
    }
    else if(this.dst !== undefined && this.shp == undefined && this.adj !== undefined){
      this.total = (this.adj+this.value_rate)-this.dst
    }
    else if(this.dst !== undefined && this.shp !== undefined && this.adj == undefined){
      this.total = (this.value_rate+this.shp)-this.dst
    }
    else{
      this.total = this.adj+this.value_rate
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
    
    var docDefinition = {


     content: [
       { text: 'INVOICE#'+ this.invoice, style: 'header'},
       { text: 'Status:'+ "Pending", style: 'header'},
       { text: new Date().toTimeString(), alignment: 'right'},

       { text: 'From', style: 'subheader'},
       this.global.company_name,
       "this.shipping_address",
               

       { text: 'To', style: 'subheader' },
       this.gamingname,
       this.email,
        
       { text: 'Invoice Date:', style: 'inoices', alignment: 'right' },
       {text:this.invoicedate, alignment:'right'},
       { text: 'Due Date:', style: 'inoices', alignment: 'right' },
       {text:this.duedate, alignment:'right'},
       { text: 'P.O #: '+this.order+'', style: 'inoices', alignment: 'right' },
      //  {text:this.order_number, alignment:'right'},
       

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
                   [this.itemname1,this.quantity,this.rate, this.total]
               ]
           }
       },
       {
           style: 'totalsTable',
           table: {
               widths: ['*', 75,75,75,75],
               body: [
                   [
                       'Subtotal',
                       this.amount_total,
                      
                   ],
                   [
                       'Shipping',
                       this.shippingprice,
                   ],
                   [
                       'Adjustment',
                       this.adjustmentprice
                   ],
                   [
                     'Total',
                      this.total
                   ],
                   [
                     'Balance Due',
                      this.total
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
           margin: [0, 0, 0, 0],
           alignment:'right'
           
       }
   }
     
   }
   this.pdfObj = pdfMake.createPdf(docDefinition);

   if (this.plt.is('cordova')) {
     this.pdfObj.getBuffer((buffer) => {
       var blob = new Blob([buffer], { type: 'application/pdf' });
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
    var key = Object.keys(this.gaming)[1];
    var value = this.gaming[key];
    if(this.gaming == undefined){
      alert("Please choose Item First");
    }
    else if(this.quantity == 0){
       alert("Please choose quantity more than 0");
     }
    else{
      console.log("key = ", key) // bar
      console.log("value = ", value) // baz
      console.log(this.taxinput);
     
      var qutyvalue = +this.quantity;
      var dbqtyvalue= +this.itemquantity;

      if(qutyvalue >  dbqtyvalue){
      alert ("Given Quantity is more than actual quantity");
      }
      else{
        this.qtyinhands =  dbqtyvalue - qutyvalue;
        if(this.invoicedate > this.duedate)
        {
            alert ("Due Date must be greater than Invoice Date");
        }
    
        else if(this.email == undefined || this.invoice == undefined || this.order == undefined || this.invoicedate == undefined || this.duedate == undefined){
          alert ("Please fill all Manadatory fields");
        }
        else
        {
          console.log(this.invoicedate);
          let loader = this.loadingCtrl.create({
           content:'Waiting...'
         });
         loader.present();
         let data1  = {
          item_quantity:this.qtyinhands
        };
        this.http.post('https://sum-finance-latest2.herokuapp.com/item/update/'+this.item_id+'', data1)
                .subscribe(response => {
                  console.log('POST Response:', response);
                  //this.navCtrl.push(ItemPage);
                }, error => {
                console.log("Oooops!");
                });
    
         let data = {
           customer:this.gamingname,
           order_no:this.order,
           invoice_number:this.invoice,
           invoice_date:this.invoicedate,
           Due_date:this.duedate,
           //sales_person:this.salesperson,
           customer_note:this.customer_notes,
           terms_and_conditions:this.terms_condition,
           item_quantity:this.quantity,
           item_discount:this.discountprice,
           shipping_charges:this.shippingprice,
           adjustment:this.adjustmentprice,
           total_cost:this.total,
           userId:this.global.userid,
           item_name:this.value_item,
           item_id:this.item_id,
           sale_rate:this.value_rate1,
           purchase_rate:this.purchase_rate1,
           status:"Pending",
          //  payment_option: this.paymentoption,
           cont_id:this.customer_id,
           other_user_id:this.other_user_id,
           user_name:this.global.user_name
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
         'item_name':this.value_item,'subtotal':this.value_rate,'discount':this.discountprice,'shipping':this.shippingprice,'adjustment':this.adjustmentprice,'quantity':this.quantity,'rate':this.value_rate1,
       'email':this.email,'order':this.order,'status':"Pending",'billingaddress':this.billing_address,'shippingaddress':this.shipping_address});
        
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
     }
    }
  }
     
   onCancel(){
     //alert("Ha g");
     console.log(this.gaming);
   }
   adlineitem(){
   
    this.navCtrl.push(AddLineItemPage,{invoicenumber:this.invoice,ordernumber:this.order,invoiced:this.invoicedate,dued:this.duedate,selectedvalue:this.gaming});
   }
   goTo(){
    console.log('this.anArray',this.anArray);
    this.data=true;
    }
  Add(){
    this.anArray.push({'value':this.value});
    }
    openitem(){
      this.navCtrl.push(CreateItemsPage);
    }
    onItemChange(){
   
      console.log(this.itemname1);
      
      var key = Object.keys(this.itemname1)[1];
       this.value_item = this.itemname1[key];
      
      var key_id = Object.keys(this.itemname1)[0];
      this.item_id = this.itemname1[key_id];
      var key_id3 = Object.keys(this.itemname1)[6];
      
      var key_id4 = Object.keys(this.itemname1)[7];
      var key_id5 = Object.keys(this.itemname1)[2];
      var key_id6 = Object.keys(this.itemname1)[3];
      var key_id7 = Object.keys(this.itemname1)[8];
      var key_id8 = Object.keys(this.itemname1)[9];
      var key_id9 = Object.keys(this.itemname1)[10];
  
      var key_desc = Object.keys(this.itemname1)[5];
      this.itemquantity = this.itemname1[key_id8];
      this.value_desc = this.itemname1[key_id9];
      var key_item_quantity =Object.keys(this.itemname1)[5];
      var key_rate = Object.keys(this.itemname1)[4];
      this.purchase_rate1 = this.itemname1[key_id3];
      this.quanitytnillrate = this.itemname1[key_rate];
      this.value_key_rate = this.itemname1[key_rate];
      this.value_rate1 = this.itemname1[key_rate];
      this.value_rate = this.value_rate1;
      this.total = this.value_rate;
      
        console.log("key = ", key, "Key_Desc=",key_desc, "key_rate = ",key_rate,key_id,key_id3,key_id4,key_id5,key_id6,key_id7,key_id8,key_id9) // bar
  console.log("value = ", this.value_item,"value_Des = ", this.value_desc,"value_rate = ", this.value_rate,this.itemquantity,this.purchase_rate, this.item_id) // baz
    }
    quantitychange(){
      console.log(this.quantity);
     
      //this.itemquantity = this.quantity;
      this.xyz = +this.value_rate;
      if(this.quantity == ""){
        this.value_rate = this.quanitytnillrate * this.quantity;
        
      }else{
        this.value_rate = this.quanitytnillrate * this.quantity;
        this.total = this.value_rate;
      }
  
      
    }
    onSelectChange(tax){

      console.log(tax);
      console.log(this.value_rate);
      var key = Object.keys(tax)[2];
      this.value_tax = tax[key];
       
        console.log("key = ", key) // bar
        console.log("value = ", this.value_tax) // baz
  
      console.log(this.value_rate/100);
      this.taxrate = (this.value_rate/100)*this.value_tax;
      this.taxfixedvalue = this.taxrate.toFixed(2);
      console.log(this.taxfixedvalue);
      var y = +this.value_rate;
      this.finalrate = this.taxrate+y;  
      console.log(this.finalrate);
      //this.value_rate=this.finalrate;
    }
}
