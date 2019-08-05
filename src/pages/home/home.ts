import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, NavParams,Nav,AlertController } from 'ionic-angular';
// import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
// import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from '@ionic/storage';
import {CreateContactPage} from '../create-contact/create-contact';
import {CreateInvoicesPage} from '../create-invoices/create-invoices';
import {CreateItemsPage} from '../create-items/create-items';
import {ReportsPage} from '../reports/reports'
import {ItemPage} from '../item/item'
import {BillsPage} from '../bills/bills';
import {ExpensePage} from '../expense/expense';
import {GlobalProvider} from '../../providers/global/global';
import {SignupProvider} from '../../providers/signup/signup';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
 
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { App } from 'ionic-angular';
import {EditProfilePage} from '../edit-profile/edit-profile';
import { ModalController } from 'ionic-angular';
import {Http ,Response} from '@angular/http';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild(Nav) nav: Nav;
  public prolfies: any;
  public allContacts: any
  companyname:any;
  userid:any;
  nativename:any;
  // books: Observable<any[]>;
   constructor(public navCtrl: NavController, public http:Http ,public modalCtrl: ModalController,private navparm:NavParams,public app:App,public alertCtrl:AlertController,public signuppro:SignupProvider,public global:GlobalProvider,private plt: Platform, private file: File, private fileOpener: FileOpener, private storage: Storage,private contacts: Contacts) {
    // this.books = afDB.list('/Books/Books').valueChanges();
    
    this.companyname = this.global.company_name;
    console.log(this.signuppro.mailstatus);
    //this.storage.set('customername', this.companyname);
    this.userid = this.global.userid;
    console.log(this.companyname, "User ID" +this.userid);
    console.log("User ID : "+ this.global.userid);
}
 
 ionViewDidLoad() {
   if(this.global.mailstatus == false){
     alert("Please verify your email address")
   }

   
  this.nativename = this.global.company_name;
  console.log('ionViewDidLoad DashboardPage');
  this.plt.registerBackButtonAction(() => {
    // Catches the active view
    let nav = this.app.getActiveNavs()[0];
    let activeView = nav.getActive();                
    // Checks if can go back before show up the alert
    if(activeView.name === 'HomePage') {
        const alert = this.alertCtrl.create({
                title: 'Exit',
                message: 'Want to Exit App?',
                buttons: [{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                      this.navCtrl.push(HomePage);
                                        }
                },{
                    text: 'OK',
                    handler: () => {
                      this.plt.exitApp();
                    }
                }]
            });
            alert.present();
        
    }
});

//http://localhost:3000/user/userdata/5d1512f52b7d6f0017908263
 }
 ionViewWillEnter(){
  console.log(this.global.userid);
  this.http.get('https://sum-finance-latest2.herokuapp.com/user/userdata/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
    console.log(data);
    this.nativename = data[0].company_name;
     });

  this.nativename = this.global.company_name;
  this.plt.registerBackButtonAction(() => {
    // Catches the active view
    let nav = this.app.getActiveNavs()[0];
    let activeView = nav.getActive();                
    // Checks if can go back before show up the alert
    if(activeView.name === 'HomePage') {
        const alert = this.alertCtrl.create({
                title: 'Sum Invoices',
                message: 'Want to Exit App?',
                buttons: [{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                      this.navCtrl.push(HomePage);
                    }
                },{
                    text: 'OK',
                    handler: () => {
                      this.plt.exitApp();
                    }
                }]
            });
            alert.present();
        
    }
});
 
}
getcontacts(){
this.contacts.find(['displayName', 'name', 'phoneNumbers', 'emails'], {filter: "", multiple: true})
    .then(data => {
      this.allContacts = data
      console.log(this.allContacts);
    });
}
selectCP(item){
alert(item);
}
contactpage(){
  this.navCtrl.push(CreateContactPage);
}
invoicepage(){
  this.navCtrl.push(CreateInvoicesPage);
}
reportspage(){
  this.navCtrl.push(ReportsPage);
}
itemspage(){
this.navCtrl.push(CreateItemsPage);
}
expensepage(){
this.navCtrl.push(ExpensePage);
}
profilepage(){
this.navCtrl.push(EditProfilePage);
}
}