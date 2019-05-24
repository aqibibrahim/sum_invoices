import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Nav,LoadingController, ToastController,Platform } from 'ionic-angular';
import {BillingPage} from '../billing/billing';
import {ShippingPage} from '../shipping/shipping';
import {ContactsPage} from '../contacts/contacts'
import {Http ,Response } from '@angular/http';
import { SMS } from '@ionic-native/sms';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import {GlobalProvider} from '../../providers/global/global';
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

  listItems: Array<any> = [];
  testRadioOpen:boolean;
  testRadioResult:any;
  public allContacts: any

  billing_address:any;
  constructor(public navCtrl: NavController, public platform: Platform,public app: App,public global:GlobalProvider,public navParams: NavParams, private sms: SMS,private alertCtrl: AlertController,private contacts: Contacts,public http: Http,public loadingCtrl: LoadingController, public tostctrl: ToastController) {
    //this.data.username = '';
    this.listItems = [];
    this.billing_address = this.navParams.get('billing_address');
    console.log(this.billing_address);
    contacts.find(['displayName', 'name', 'phoneNumbers', 'emails'], {filter: "", multiple: true})
    .then(data => {
      this.allContacts = data
      //this.listItems.push(this.allContacts.displayName)

      console.log(this.allContacts.length);
      for(var i=0;i<this.allContacts.length;i++){
        //console.log(this.allContacts[i].displayName);
        this.listItems.push(this.allContacts[i].displayName)
      }
      console.log(this.listItems);
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateContactPage');
    this.platform.registerBackButtonAction(() => {
      // Catches the active view
      let nav = this.app.getActiveNavs()[0];
      let activeView = nav.getActive();                
      // Checks if can go back before show up the alert
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
              alert.present();
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
    let alert = this.alertCtrl.create();
    alert.setTitle('Select Contact');

    alert.addInput({
      type: 'radio',
        label: this.allContacts[1].displayName,
        value: this.listItems[1],
      checked: true
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });
    alert.present();
  }
  savedata(){
    let loader = this.loadingCtrl.create({
      content:'Waiting...'
    });
    loader.present();
    let data = {
      cont_saln:this.gaming,
      first_name: this.firstname,
      last_name:this.lastname,
      comp_name:this.companyname,
      display_name:this.contactdisplay,
      email:this.email,
      phone:this.phone,
      mobile:this.mobile,
      cont_type:this.sexe,
      currency:this.currency,
      payment:this.payment,
      language:this.language,
      userId:this.global.userid,
      billing_address:this.billing_address
  };
    //console.log(this.data.username);
    this.http.post('https://sum-finance-latest2.herokuapp.com/finance/create', data)
        .subscribe(response => {
          console.log('POST Response:', response);
          loader.dismiss();
          let toast = this.tostctrl.create({
            message:'Data Save',
            duration:2000
          });
      //     toast.present();
      //     //this.sms.send("+923335175480", "this.message")
      // .then(()=>{
      //   let toast = this.tostctrl.create({
      //     message: 'Message send successfully',
      //     duration: 3000        });
      //   toast.present();
      // },()=>{
      //   let toast = this.tostctrl.create({
      //     message: 'Failure',
      //     duration: 3000        });
      //   toast.present();
      // });
          this.navCtrl.push(ContactsPage);
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
      