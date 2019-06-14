import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController,Nav,AlertController,Platform } from 'ionic-angular';
import {Http ,Response} from '@angular/http';
import {InvoicesPage} from '../invoices/invoices';
import { App } from 'ionic-angular';
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
  paymentoption:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public app: App,public platform:Platform,public alertCtrl:AlertController,public http: Http,public loadingCtrl: LoadingController, public tostctrl: ToastController) {
    this.id= this.navParams.get('id');
    this.http.get('https://sum-finance-latest2.herokuapp.com/invoice/get/'+this.id+'').map(res => res.json()).subscribe(data => {
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

console.log( this.value_invoice_number);

       });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditinvoicePage');
    this.platform.registerBackButtonAction(() => {
      // Catches the active view
      let nav = this.app.getActiveNavs()[0];
      let activeView = nav.getActive();                
      // Checks if can go back before show up the alert
      if(activeView.name === 'EditinvoicePage') {
          if (nav.canGoBack()){
              nav.pop();
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
     // Checks if can go back before show up the alert
     if(activeView.name === 'EditinvoicePage') {
         if (nav.canGoBack()){
           this.navCtrl.push(InvoicesPage);
         } else {
           this.navCtrl.push(InvoicesPage);
         }
     }
 });
    
}
  updateinvoice(){
    let loader = this.loadingCtrl.create({
      content:'Waiting...'
    });
    loader.present();
    let data = {
      status:"paid",
      payment_option:this.paymentoption
    };
    //console.log(this.data.username);
    this.http.post('https://sum-finance-latest2.herokuapp.com/invoice/update/'+this.id+'', data)
        .subscribe(response => {
          loader.dismiss();
            let toast = this.tostctrl.create({
              message:'Data Save',
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
  isReadonly() {
    return this.isReadonly;   //return true/false 
  }
}
