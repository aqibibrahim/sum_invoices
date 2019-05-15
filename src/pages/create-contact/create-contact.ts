import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController, ToastController } from 'ionic-angular';
import {BillingPage} from '../billing/billing';
import {ShippingPage} from '../shipping/shipping';
import {ContactsPage} from '../contacts/contacts'
import {Http ,Response } from '@angular/http';
import { SMS } from '@ionic-native/sms';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import {GlobalProvider} from '../../providers/global/global';
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
  constructor(public navCtrl: NavController, public global:GlobalProvider,public navParams: NavParams, private sms: SMS,private alertCtrl: AlertController,private contacts: Contacts,public http: Http,public loadingCtrl: LoadingController, public tostctrl: ToastController) {
    //this.data.username = '';
    this.listItems = [];
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
  }

  openshippingpage(){
    this.navCtrl.push(ShippingPage);
  }
  openbillingpage(){
    this.navCtrl.push(BillingPage);
  }
  opencontact() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Select Gender');

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
      userId:this.global.userid
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
          toast.present();
          this.sms.send("+923335175480", "this.message")
      .then(()=>{
        let toast = this.tostctrl.create({
          message: 'Message send successfully',
          duration: 3000        });
        toast.present();
      },()=>{
        let toast = this.tostctrl.create({
          message: 'Failure',
          duration: 3000        });
        toast.present();
      });
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
      