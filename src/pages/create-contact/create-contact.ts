import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {BillingPage} from '../billing/billing';
import {ShippingPage} from '../shipping/shipping';
import {Http ,Response } from '@angular/http';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
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
  //data:any = {};
  firstname: string;
  lastname: string;
  companyname: string;
  listItems: Array<any> = [];
  testRadioOpen:boolean;
  testRadioResult:any;
  public allContacts: any
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,private contacts: Contacts,public http: Http) {
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
  
  // opencontact(){
    
  //   let alert = this.alertCtrl.create({
  //     //title: item.title,
  //     title: 'Low battery',
  //     subTitle: '10% of battery remaining',
  //     cssClass: 'my-class',
      
      
  //   });
  //   alert.present();
  // }

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

    let data = {
      firstname: this.firstname,
      lastname:this.lastname,
      companyname:this.companyname
  };
    //console.log(this.data.username);
    this.http.post('https://sum-finance.herokuapp.com/finance/create', data)
        .subscribe(response => {
          console.log('POST Response:', response);
        }, error => {
        console.log("Oooops!");
        });
        }
      }