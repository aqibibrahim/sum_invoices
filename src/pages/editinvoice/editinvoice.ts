import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController,Nav,AlertController,Platform,IonicApp } from 'ionic-angular';
import {Http ,Response} from '@angular/http';
import {InvoicesPage} from '../invoices/invoices';
import { App } from 'ionic-angular';
import { Network } from '@ionic-native/network';
/**
 * Generated class for the EditinvoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editinvoice',
  templateUrl: 'editinvoice.html',
})
export class EditinvoicePage {
  @ViewChild(Nav) nav: Nav;
id:any;
itemid:any;
itemquantity:any;
finalquantity:any;
invoice:any;
status:any;
  value_due_date:any;
  value_adjustment:any;
  value_customer:any;
  value_customer_note:any;
  value_email:any;
  value_invoice_date:any;
  value_invoice_number:any;
  value_item_discount:any;
  value_item_quantity:any;
  value_order_no:any;
  value_sales_person:any;
  value_shipping_charges:any;
  value_terms:any;
  value_terms_condition:any;
  value_total_cost:any;
  value_status:any;
  value_item_name:any;
  value_payment_option:any;
  paymentoption:any;
  alert:any;
  constructor(public navCtrl: NavController, private ionicApp: IonicApp,public network:Network,public navParams: NavParams,public app: App,public platform:Platform,public alertCtrl:AlertController,public http: Http,public loadingCtrl: LoadingController, public tostctrl: ToastController) {
    this.id= this.navParams.get('id');
    this.http.get('https://sum-invoice-app.herokuapp.com/invoice/get/'+this.id+'').map(res => res.json()).subscribe(data => {
      console.log(data);
         this.invoice = data
        
          this.value_due_date = data[0].Due_date;
          this.value_customer_note = data[0].comp_name;
          this.value_invoice_date = data[0].invoice_date;
          this.value_invoice_number = data[0].invoice_number;
          this.value_item_quantity = data[0].item_quantity;
          this.value_order_no = data[0].order_no;
          this.value_sales_person = data[0].sales_person;
          this.value_terms = data[0].comp_name;
          this.value_total_cost = data[0].total_cost;
          this.value_status = data[0].status;
          this.value_customer = data[0].customer;
          this.value_email = data[0].email;
          this.value_item_name = data[0].item_name;
          this.value_payment_option = data[0].payment_option;
          this.itemid = data[0].item_id;

      console.log( this.value_invoice_number);
      console.log(this.itemid);

       });
       


  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad EditinvoicePage');
    this.platform.registerBackButtonAction(() => {
      // Catches the active view
      let nav = this.app.getActiveNavs()[0];
      let activeView = nav.getActive();  
      let activePortal = this.ionicApp._loadingPortal.getActive() ||
      //let activePortal = this.ionicApp._loadingPortal.getActive() ||
      this.ionicApp._modalPortal.getActive() ||
      this.ionicApp._toastPortal.getActive() ||
      this.ionicApp._overlayPortal.getActive();

    if (activePortal) {
      activePortal.dismiss();
    }
    else {
      if(activeView.name === 'EditinvoicePage') {
        if (nav.canGoBack()){
            nav.pop();
        } else {
          console.log("Back Pressed")
           
        }
    } else {
      this.navCtrl.push(InvoicesPage);
      }
    }
   
  });
  }
  ionViewDidEnter() {
    this.platform.registerBackButtonAction(() => {
      // Catches the active view
      let nav = this.app.getActiveNavs()[0];
      let activeView = nav.getActive();  
      let activePortal = this.ionicApp._loadingPortal.getActive() ||
      this.ionicApp._modalPortal.getActive() ||
      this.ionicApp._toastPortal.getActive() ||
      this.ionicApp._overlayPortal.getActive();

    if (activePortal) {
      activePortal.dismiss();
    }
    else {
      if(activeView.name === 'EditinvoicePage') {
       nav.canGoBack()
            nav.pop();
        } else {
          this.navCtrl.push(InvoicesPage);      
        }
    } 
  });
    
}
  updateinvoice(){

    if(this.network.type === 'none'){
      this.alert = this.alertCtrl.create({
        title: 'Alert!',
        message: 'There is no Internet connection available, please proceed again when you have a connnection',
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
  else{
    let loader = this.loadingCtrl.create({
      content:'Waiting...'
    });
    loader.present();
    let data = {
      status:"paid",
      payment_option:this.paymentoption
    };
    //console.log(this.data.username);
    this.http.post('https://sum-invoice-app.herokuapp.com/invoice/update/'+this.id+'', data)
        .subscribe(response => {
          loader.dismiss();
            let toast = this.tostctrl.create({
              message:'Update Invoice Status Successfully',
              duration:2000
            });
            toast.present();
          this.navCtrl.push(InvoicesPage);
        }, error => {
          loader.dismiss();
            let toast = this.tostctrl.create({
              message:'Data not Save',
              duration:2000
            });
            toast.present();
        
        });
  }
    
  }
  isReadonly() {
    return this.isReadonly;   //return true/false 
  }
  deleteinvoice(){
    if(this.network.type === 'none'){
      this.alert = this.alertCtrl.create({
        title: 'Alert!',
        message: 'There is no Internet connection available, please proceed again when you have a connnection',
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
  else{
    this.http.get('https://sum-invoice-app.herokuapp.com/item/get/'+this.itemid+'').map(res => res.json()).subscribe(data => {
      console.log(data);
       this.itemquantity = data[0].item_quantity;
       var quanity =+this.itemquantity
       this.finalquantity =  this.value_item_quantity + quanity
       console.log(this.finalquantity)
       });
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
            id:this.id
          }
         
          this.http.post('https://sum-invoice-app.herokuapp.com/invoice/delete/'+this.id+'', data)
          .subscribe(res => {
            
            loader.dismiss();
                  let toast = this.tostctrl.create({
                    message:'Invoice Delete Successfully',
                    duration:2000
                  });
                  toast.present();
            this.navCtrl.push(InvoicesPage);
          }, err => {
            loader.dismiss();
                  let toast = this.tostctrl.create({
                    message:'Invoice not Delete',
                    duration:2000
                  });
                  toast.present();
           
          });
          let data1  = {
            item_quantity:this.finalquantity
          };
          this.http.post('https://sum-invoice-app.herokuapp.com/item/update/'+this.itemid+'', data1)
                  .subscribe(response => {
                    console.log('POST Response:', response);
                    //this.navCtrl.push(ItemPage);
                  }, error => {
                  console.log("Oooops!");
                  });
        }
    }]
});
alert.present();
  }
  }
}
