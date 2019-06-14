import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import {SignupProvider}  from '../../providers/signup/signup';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http ,Response } from '@angular/http';
import {GlobalProvider} from '../../providers/global/global';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,public fb: FormBuilder,public http: Http,public loadingCtrl: LoadingController, public tostctrl: ToastController, public global:GlobalProvider) {
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

}
