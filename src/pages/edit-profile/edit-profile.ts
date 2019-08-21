import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Nav,LoadingController, ToastController, Toast,Platform,IonicApp } from 'ionic-angular';
// import {SignupProvider}  from '../../providers/signup/signup';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http ,Response } from '@angular/http';
import {GlobalProvider} from '../../providers/global/global';
import { HomePage } from '../home/home';
import { App } from 'ionic-angular';
/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  @ViewChild(Nav) nav: Nav;
  myForm: FormGroup;
  pattern: string;

  isName: boolean = false;
  isEmail: boolean = false;
  isfullname: boolean = false;
  iscountry: boolean = false;

  compname:any;
  fullname:any;
  email:any;
  password:any;
  country:any;
  country1:any;
  constructor(public navCtrl: NavController, public platform: Platform,private ionicApp: IonicApp,public alertCtrl:AlertController, public app: App,public navParams: NavParams,public fb: FormBuilder,public http: Http,public loadingCtrl: LoadingController, public tostctrl: ToastController, public global:GlobalProvider) {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      fullname:['',[Validators.required,Validators.pattern("[a-zA-Z ]*")]],
      //  country:['',[Validators.required]],
      email: ['', [Validators.required, Validators.email,Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/)]],
       //phone: ['',[Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
    });
    this.http.get('https://restcountries.eu/rest/v2/all').map(res => res.json()).subscribe(data => {
    console.log(data);
      
       this.country1 = data 
       
     });
      
      this.compname = this.global.company_name;
      this.fullname = this.global.user_name;
      this.email = this.global.user_email;
      console.log(this.compname, this.fullname, this.email);
  }
  ionViewWillEnter(){
    console.log(this.global.userid);
    this.http.get('https://sum-invoice-app.herokuapp.com/user/userdata/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
      console.log( data);
      this.compname = data[0].company_name;
      this.fullname = data[0].user_name;
      this.email = data[0].email;

       });
      }
  validate(data){
    if(data == 'name'){
      this.isName = true;
    }
    // else if(data == 'country'){
    //   this.iscountry = true;
    // }
    else if(data == 'email'){
      this.isEmail = true;
    }
    else if(data == 'fullname'){
      this.isfullname = true;
    }
  }
  isReadonly() {
    return this.isReadonly;   //return true/false 
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
    this.platform.registerBackButtonAction(() => {
      // Catches the active view
      let nav = this.app.getActiveNavs()[0];
      let activeView = nav.getActive();  
      let activePortal = this.ionicApp._loadingPortal.getActive() ||
      this.ionicApp._modalPortal.getActive() ||
      this.ionicApp._toastPortal.getActive() ||
      this.ionicApp._overlayPortal.getActive();

    if (activePortal) {
      activePortal.dismiss();
    }
    else {
      if(activeView.name === 'EditProfilePage') {
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
            //alert.present();
        }
    } else {
      this.nav.setRoot('HomePage');
      }
    }
  });
  }
updateprofile(){
  let loader = this.loadingCtrl.create({
    content:'Waiting...'
  });
  loader.present();
  let data = {
    company_name:this.compname,
    user_name : this.fullname,
    email:this.email
    // country: this.country,
  };
  //console.log(this.data.username);
  this.http.post('https://sum-invoice-app.herokuapp.com/user/updateprofile/'+this.global.userid+'', data)
      .subscribe(response => {
        console.log('POST Response:', response);
        loader.dismiss();
        this.navCtrl.push(HomePage);
      }, error => {
      console.log("Oooops!");
      });
}
}
