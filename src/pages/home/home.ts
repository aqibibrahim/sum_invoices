import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
// import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
// import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from '@ionic/storage';
import {CreateContactPage} from '../create-contact/create-contact';
import {CreateInvoicesPage} from '../create-invoices/create-invoices';
import {ReportsPage} from '../reports/reports'
import {CreateEstimatePage} from '../create-estimate/create-estimate'
import {BillsPage} from '../bills/bills';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
 
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public prolfies: any;
  public allContacts: any
  // books: Observable<any[]>;
   constructor(public navCtrl: NavController, private plt: Platform, private file: File, private fileOpener: FileOpener, private storage: Storage,private contacts: Contacts) {
    // this.books = afDB.list('/Books/Books').valueChanges();
    storage.set('name', 'Max');
}
 
 ionViewDidLoad() {
  console.log('ionViewDidLoad DashboardPage');
  
}
// createdb(){
//   this.sqlite.create({
//     name: 'data.db',
//     location: 'default'
//   })
//     .then((db: SQLiteObject) => {
  
  
//       db.executeSql('create table danceMoves(name VARCHAR(32))', [])
//         .then(() => console.log('Executed SQL'))
//         .catch(e => console.log(e));
  
  
//     })
//     .catch(e => console.log(e));
// }

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
estimatespage(){
this.navCtrl.push(CreateEstimatePage);
}
billspage(){
this.navCtrl.push(BillsPage);
}
}