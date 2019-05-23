import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController, ToastController,Navbar } from 'ionic-angular';
import {CreateContactPage} from '../create-contact/create-contact';
import {Http ,Response} from '@angular/http';
import {ContactdetailsPage} from '../contactdetails/contactdetails';
import {GlobalProvider} from '../../providers/global/global';
import 'rxjs/add/operator/map';
import {HomePage} from '../home/home';

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
  @ViewChild(Navbar) navBar: Navbar;
  posts: any;
  constructor(public navCtrl: NavController, public global: GlobalProvider,public navParams: NavParams,public http: Http,public loadingCtrl: LoadingController, public tostctrl: ToastController) {
    
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
    }
    ionViewDidEnter() {
      this.http.get('https://sum-finance-latest2.herokuapp.com/finance/getByUserId/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
        console.log(data);
           //this.posts = data.json();
           this.posts = data 
           // for(var i=0;i<result.data.length;i++){
           //   this.posts = result.data[i].first_name;
           //   console.log(this.posts);
           // }
           this.setBackButtonAction();
         });
    }
    setBackButtonAction(){
      this.navBar.backButtonClick = () => {
      //alert("Where you want to go");
      this.navCtrl.push(HomePage);
       //this.navCtrl.pop()
      }
    }
  createcontact(){
    this.navCtrl.push(CreateContactPage);
  }
  // contactdetails(name,phone,mobile,email){
  //   this.navCtrl.push(ContactdetailsPage, {last_name:name,phone:phone,mobile:mobile,email:email});
  // }
  contactdetails(post):void {
    //console.log(item.title);
    console.log(post._id);
    this.navCtrl.push(ContactdetailsPage,{id:post._id})
}
  removeItem(post):void{
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
  
}
