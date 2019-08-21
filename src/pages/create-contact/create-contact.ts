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
  contactnumber:any;
  contactcompany:any;
  contactaddress:any;
  
  constructor(public navCtrl: NavController, public checkemail:CheckemailProvider,private ionicApp: IonicApp,public platform: Platform,public app: App,public global:GlobalProvider,public navParams: NavParams, private sms: SMS,private alertCtrl: AlertController,private contacts: Contacts,public http: Http,public loadingCtrl: LoadingController, public tostctrl: ToastController) {
    //this.data.username = '';
    this.contactList = contacts;
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
      if(activeView.name === 'CreateContactPage') {
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
            //alert.present();
        }
    } else {
      this.nav.setRoot('HomePage');
      }
    }
   
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateContactPage');
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
      if(activeView.name === 'CreateContactPage') {
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
            //alert.present();
        }
    } else {
      this.nav.setRoot('HomePage');
      }
    }
   
  });
  }
  ionViewWillEnter(){
    console.log('ionViewDidLoad CreateContactPage');
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
      if(activeView.name === 'CreateContactPage') {
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
            //alert.present();
        }
    } else {
      this.navCtrl.push(HomePage);
      }
    }
        
    
     
      // let activeView = nav.getActive();                
      // // Checks if can go back before show up the alert
      
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
   
    this.contactdisplayname = contact.displayName;
    this.contactemail = contact.emails;
    if(contact.organizations[0].name == ""){
      this.contactcompany == "";  
    }
    else{
      this.contactcompany = contact.organizations[0].name;
    }
    if(contact.phoneNumbers[0].value == ""){
      this.contactnumber == ""
    }
    else{
      this.contactnumber = contact.phoneNumbers[0].value;
    }
    
    this.contactaddress = contact.addresses;
    
}),(error) =>{
    console.log(error);
    }
  }
  savedata(){
    if(this.sexe == undefined){
      alert("Please select customer type")
    }
    else{
      
      this.checkemail.checkemail(this.email,this.gaming,this.firstname,this.lastname,this.companyname,this.contactdisplay,this.phone,this.mobile,this.sexe,this.currency
        ,this.payment,this.language,this.billingaddress,this.shippingaddress);
      }
       }
      
}