import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController, Nav,ToastController,Navbar,Platform } from 'ionic-angular';
import {CreateContactPage} from '../create-contact/create-contact';
import {Http ,Response} from '@angular/http';
import {ContactdetailsPage} from '../contactdetails/contactdetails';
import {GlobalProvider} from '../../providers/global/global';
import 'rxjs/add/operator/map';
import {HomePage} from '../home/home';
import { App } from 'ionic-angular';

/**
 * Generated class for the ContactsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {
  @ViewChild(Nav) nav: Nav;
  posts: any;
  constructor(public navCtrl: NavController, public global: GlobalProvider,public app: App,public platform:Platform,public navParams: NavParams,public http: Http,public loadingCtrl: LoadingController,public alertCtrl:AlertController, public tostctrl: ToastController) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsPage');
    
    this.http.get('https://sum-finance-latest2.herokuapp.com/finance/getByUserId/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
     console.log(data);
     if(data.length == 0){
      alert("There is no Contact added");
    }
        this.posts = data 
      });
      this.platform.registerBackButtonAction(() => {
          // Catches the active view
          let nav = this.app.getActiveNavs()[0];
          let activeView = nav.getActive();                
          // Checks if can go back before show up the alert
          if(activeView.name === 'ContactsPage') {
              if (nav.canGoBack()){
                this.navCtrl.push(HomePage);
              } else {
                this.navCtrl.push(HomePage);
                 
              }
          }
      });
    }
    ionViewDidEnter() {
      this.http.get('https://sum-finance-latest2.herokuapp.com/finance/getByUserId/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
        console.log(data);
           //this.posts = data.json();
           this.posts = data 
           
         });
         this.platform.registerBackButtonAction(() => {
          // Catches the active view
          let nav = this.app.getActiveNavs()[0];
          let activeView = nav.getActive();                
          // Checks if can go back before show up the alert
          if(activeView.name === 'ContactsPage') {
              if (nav.canGoBack()){
                this.navCtrl.push(HomePage);
              } else {
                this.navCtrl.push(HomePage);
              }
          }
      });
         
    }
    
  createcontact(){
    this.navCtrl.push(CreateContactPage);
  }
 
  contactdetails(post):void {
    //console.log(item.title);
    console.log(post._id);
    this.navCtrl.push(ContactdetailsPage,{id:post._id})
}
  removeItem(post):void{

    const alert = this.alertCtrl.create({
      title: 'Contact Delete',
      message: 'Do you Want to Delete this Contact',
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
              id:post._id
            }
            this.http.post('https://sum-finance-latest2.herokuapp.com/finance/delete/'+post._id+'', data)
            .subscribe(res => {
              console.log(res);
              loader.dismiss();
                  let toast = this.tostctrl.create({
                    message:'Contact Delete',
                    duration:2000
                  });
                  toast.present();
              this.ionViewDidEnter();
            }, err => {
              loader.dismiss();
                  let toast = this.tostctrl.create({
                    message:'Contact not Delete',
                    duration:2000
                  });
                  toast.present();
              //console.log(err);
            });
          }
      }]
  });
  alert.present();
  }
  
}
