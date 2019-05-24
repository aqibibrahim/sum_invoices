import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController,Nav,AlertController,Platform } from 'ionic-angular';
import {Http ,Response} from '@angular/http';
import {ContactsPage} from '../contacts/contacts';
import { App } from 'ionic-angular';
/**
 * Generated class for the ContactdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contactdetails',
  templateUrl: 'contactdetails.html',
})
export class ContactdetailsPage {
  @ViewChild(Nav) nav: Nav;
  id:any;
  posts:any;
   buttonClicked1 = true;
   buttonClicked2 = false;
   contact_id:any;
   mobile:any;
   phone:any;
   email:any;
   mydate:any; 
   displayname:any;

   value_company_name:any;
   value_contact_saln:any;
   value_contact_type:any;
   value_currency:any;
   value_display_name:any;
   value_email:any;
   value_first_name:any;
   value_last_name:any;
   value_mobile:any;
   value_phone:any;



  constructor(public navCtrl: NavController, public navParams: NavParams,public app: App,public platform:Platform,public alertCtrl:AlertController,public http: Http,public loadingCtrl: LoadingController, public tostctrl: ToastController) {
    this.mydate=new Date();
    this.id= this.navParams.get('id');
    
    this.http.get('https://sum-finance-latest2.herokuapp.com/finance/get/'+this.id+'').map(res => res.json()).subscribe(data => {
      console.log(data);
         this.posts = data 
          this.value_company_name = data[0].comp_name;
          this.value_contact_saln = data[0].cont_saln;
          this.value_contact_type = data[0].cont_type;
          this.value_currency = data[0].currency;
          this.value_display_name = data[0].display_name;
          this.value_email = data[0].email;
          this.value_first_name = data[0].first_name;
          this.value_last_name = data[0].last_name;
          this.value_mobile = data[0].mobile;
          this.value_phone =data[0].phone;
});
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactdetailsPage');
    this.platform.registerBackButtonAction(() => {
      // Catches the active view
      let nav = this.app.getActiveNavs()[0];
      let activeView = nav.getActive();                
      // Checks if can go back before show up the alert
      if(activeView.name === 'ContactsPage') {
          if (nav.canGoBack()){
              nav.pop();
          } else {
            this.navCtrl.push(ContactsPage);
          }
      }
  });
  }
  ionViewDidEnter() {
    
    this.platform.registerBackButtonAction(() => {
     // Catches the active view
     let nav = this.app.getActiveNavs()[0];
     let activeView = nav.getActive();                
     // Checks if can go back before show up the alert
     if(activeView.name === 'ContactdetailsPage') {
         if (nav.canGoBack()){
           this.navCtrl.push(ContactsPage);
         } else {
           this.navCtrl.push(ContactsPage);
         }
     }
 });
    
}
  onButtonClick1() {

    this.buttonClicked1 = !this.buttonClicked1;
    this.buttonClicked2 = false;
}
onButtonClick2() {

  this.buttonClicked2 = !this.buttonClicked2;
  this.buttonClicked1 = false;
}
updatecontact(){
  let loader = this.loadingCtrl.create({
    content:'Waiting...'
  });
  loader.present();
  let data = {
    email:this.email,
    phone:this.phone,
    mobile:this.mobile
  };
  //console.log(this.data.username);
  this.http.post('https://sum-finance-latest2.herokuapp.com/finance/update/'+this.id+'', data)
      .subscribe(response => {
        loader.dismiss();
          let toast = this.tostctrl.create({
            message:'Data Save',
            duration:2000
          });
          toast.present();
        this.navCtrl.push(ContactsPage);
      }, error => {
        loader.dismiss();
          let toast = this.tostctrl.create({
            message:'Data not Save',
            duration:2000
          });
          toast.present();
      
      });
      }

}

