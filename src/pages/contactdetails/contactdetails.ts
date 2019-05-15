import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController } from 'ionic-angular';
import {Http ,Response} from '@angular/http';
import {ContactsPage} from '../contacts/contacts';
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



  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public loadingCtrl: LoadingController, public tostctrl: ToastController) {
    this.mydate=new Date();
    this.id= this.navParams.get('id');
    
    this.http.get('https://sum-finance-latest2.herokuapp.com/finance/get/'+this.id+'').map(res => res.json()).subscribe(data => {
      console.log(data);
         this.posts = data 
         
         var key_company_name = Object.keys(this.posts)[4];
         var key_contact_saln = Object.keys(this.posts)[1];
         var key_contact_type = Object.keys(this.posts)[9];
         var key_currency = Object.keys(this.posts)[3];
         var key_display_name = Object.keys(this.posts)[5];
         var key_email = Object.keys(this.posts)[6];
         var key_first_name = Object.keys(this.posts)[2];
         var key_last_name = Object.keys(this.posts)[3];
         var key_mobile = Object.keys(this.posts)[8];
         var key_phone = Object.keys(this.posts)[7];

          this.value_company_name = this.posts[key_company_name];
          this.value_contact_saln = this.posts[key_contact_saln];
          this.value_contact_type = this.posts[key_contact_type];
          this.value_currency = this.posts[key_currency];
          this.value_display_name = this.posts[key_display_name];
          this.value_email = this.posts[key_email];
          this.value_first_name = this.posts[key_first_name];
          this.value_last_name = this.posts[key_last_name];
          this.value_mobile = this.posts[key_mobile];
          this.value_phone = this.posts[key_phone];

        console.log(key_company_name,key_contact_saln,key_contact_type,key_currency,key_display_name,key_email,key_first_name,key_last_name,key_mobile,key_phone)
       });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactdetailsPage');
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

