import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
   buttonClicked1 = true;
   buttonClicked2 = false;
   contact_id:any;
   mobile_number:any;
   phone_number:any;
   email:any;
   mydate:any; 
   
//   settings = {
//     theme: 'material'
// }


// navSettings = {
//     theme: 'material',
//     type: 'tab',
//     display: 'inline'
    
// };

// currentTab: string = 'overview';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mydate=new Date();
    this.contact_id=this.navParams.get('last_name');
    this.phone_number=this.navParams.get('phone');
    this.mobile_number = this.navParams.get('mobile');
    this.email = this.navParams.get('email');
    console.log(this.contact_id);
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
}
