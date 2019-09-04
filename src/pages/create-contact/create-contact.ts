import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Nav,LoadingController, ToastController,Platform,IonicApp } from 'ionic-angular';
import {BillingPage} from '../billing/billing';
import {ShippingPage} from '../shipping/shipping';
import {ContactsPage} from '../contacts/contacts'
import {Http ,Response } from '@angular/http';
import { SMS } from '@ionic-native/sms';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import {GlobalProvider} from '../../providers/global/global';
import {CheckemailProvider} from '../../providers/checkemail/checkemail';
import {HomePage} from '../home/home';
import { App } from 'ionic-angular';
import { Network } from '@ionic-native/network';
/**
 * Generated class for the CreateContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-contact',
  templateUrl: 'create-contact.html',
})
export class CreateContactPage {
  @ViewChild(Nav) nav: Nav;
  navigator:any; 
  data:any = {};
  firstname: string;
  lastname: string;
  companyname: string;
  gaming:string;
  sexe:string;
  currency:string;
  payment:string;
  language:string;
  contactdisplay:any;
  email:any;
  phone:any;
  mobile:any;
  conttype:any;
  userid:any;
  billingaddress:any;
  shippingaddress:any;
  other_user_id:any;
  contactList: Contacts;
  listItems: Array<any> = [];
  testRadioOpen:boolean;
  testRadioResult:any;
  public allContacts: any
  contactsfound = []

  contactdisplayname:any;
  contactemail:any;
  contactnumber=0;
  contactcompany:any;
  contactaddress:any;
  alert:any;
  constructor(public navCtrl: NavController, public network:Network,public checkemail:CheckemailProvider,private ionicApp: IonicApp,public platform: Platform,public app: App,public global:GlobalProvider,public navParams: NavParams, private sms: SMS,private alertCtrl: AlertController,private contacts: Contacts,public http: Http,public loadingCtrl: LoadingController, public tostctrl: ToastController) {
    //this.data.username = '';
    this.contactList = contacts;
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateContactPage');
    this.platform.registerBackButtonAction(() => {
      let nav = this.app._appRoot._getActivePortal() || this.app.getActiveNav();
      let activeView = nav.getActive();
  
      if (activeView != null) {
        if (nav.canGoBack()) {
          nav.pop();
        } else if(activeView.isOverlay) {
          activeView.dismiss();
        } else {
          this.navCtrl.push(HomePage);
          //this.closeApp();
        }
     
      }  
    
});
  
  }
  ionViewWillEnter(){
    console.log('ionViewDidLoad CreateContactPage');
    this.platform.registerBackButtonAction(() => {
      let nav = this.app._appRoot._getActivePortal() || this.app.getActiveNav();
      let activeView = nav.getActive();
  
      if (activeView != null) {
        if (nav.canGoBack()) {
          nav.pop();
        } else if(activeView.isOverlay) {
          activeView.dismiss();
        } else {
          this.navCtrl.push(HomePage);
          //this.closeApp();
        }
     
      }  
    
});
 
  }
  openshippingpage(){
    this.navCtrl.push(ShippingPage);
  }
  openbillingpage(){
    this.navCtrl.push(BillingPage);
  }
  opencontact() {
   
  this.contactList.pickContact().then((contact)=>{
    console.log(contact);
    console.log(contact.phoneNumbers[0].value);
    this.contactdisplayname = contact.displayName;
    this.contactemail = contact.emails[0].value;
    if(contact.organizations[0].name == null){
      this.contactcompany == "";  
    }
    else{
      this.contactcompany = contact.organizations[0].name;
    }
    if(contact.phoneNumbers[0].value == null){
      this.contactnumber == 0
    }
    else{
      this.contactnumber = +contact.phoneNumbers[0].value;
    }
    
    this.contactaddress = contact.addresses[0].streetAddress;
    
}),(error) =>{
    console.log(error);
    }
  }
  savedata(){
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
    if(this.sexe == undefined){
      alert("Please select customer type")
    }
    else{
      
      this.checkemail.checkemail(this.email,this.gaming,this.firstname,this.lastname,this.companyname,this.contactdisplay,this.phone,this.mobile,this.sexe,this.currency
        ,this.payment,this.language,this.billingaddress,this.shippingaddress);
      }
  }
    }
      
}