import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http ,Response} from '@angular/http';
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
id:any;
invoice:any;

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

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {
    this.id= this.navParams.get('id');
    this.http.get('https://sum-finance-latest2.herokuapp.com/invoice/get/'+this.id+'').map(res => res.json()).subscribe(data => {
      console.log(data);
         this.invoice = data
         var key_due_date = Object.keys(this.invoice)[1];
         var key_customer = Object.keys(this.invoice)[3];
         var key_order_no = Object.keys(this.invoice)[4];
         var key_sales_person = Object.keys(this.invoice)[5];
         var key_customer_note = Object.keys(this.invoice)[6];
         var key_term_condition = Object.keys(this.invoice)[7];
         var key_item_quantity = Object.keys(this.invoice)[8];
         var key_item_discount = Object.keys(this.invoice)[9];
         var key_email = Object.keys(this.invoice)[10];
         var key_invoice_number = Object.keys(this.invoice)[11];
         var key_shipping_charges = Object.keys(this.invoice)[12];
         var key_adjustment = Object.keys(this.invoice)[13];
         var key_total_cost = Object.keys(this.invoice)[14];
         var key_terms = Object.keys(this.invoice)[15];
         var key_invoice_date = Object.keys(this.invoice)[0];
         
          this.value_due_date = this.invoice[key_due_date];
          this.value_adjustment = this.invoice[key_adjustment];
          this.value_customer = this.invoice[key_customer];
          this.value_customer_note = this.invoice[key_customer_note];
          this.value_email = this.invoice[key_email];
          this.value_invoice_date = this.invoice[key_invoice_date];
          this.value_invoice_number = this.invoice[key_invoice_number];
          this.value_item_discount = this.invoice[key_item_discount];
          this.value_item_quantity = this.invoice[key_item_quantity];
          this.value_order_no = this.invoice[key_order_no];
          this.value_sales_person = this.invoice[key_sales_person];
          this.value_shipping_charges = this.invoice[key_shipping_charges];
          this.value_terms = this.invoice[key_terms];
          this.value_terms_condition = this.invoice[key_term_condition];
          this.value_total_cost = this.invoice[key_total_cost];
          

        console.log( this.value_due_date,this.value_adjustment,this.value_customer,this.value_customer_note,this.value_email,this.value_invoice_date,this.value_invoice_number,this.value_item_discount,this.value_item_quantity,this.value_order_no
          ,this.value_sales_person,this.value_shipping_charges,this.value_terms,this.value_terms_condition,this.value_total_cost);

       });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditinvoicePage');
  }

}
