import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http ,Response } from '@angular/http';
import {LoginPage} from '../login/login';
/**
 * Generated class for the ForgotpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {
  myForm: FormGroup;
  email:any;
  password:any;
  
  isEmail: boolean = false;
  isPassword: boolean = false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public fb: FormBuilder,public http: Http,public loadingCtrl: LoadingController, public tostctrl: ToastController) {
    this.myForm = this.fb.group({
     
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
  }
  validate(data){
    
    if(data == 'email'){
      this.isEmail = true;
    }
    else if(data == 'password'){
      this.isPassword = true;
    }
  }
  submit(){
    let loader = this.loadingCtrl.create({
      content:'Waiting...'
    });
    loader.present();
    let data = {
      email:this.email,
      password: this.password
  };
  this.http.post('https://sum-finance-latest2.herokuapp.com/user/signup', data)
  .subscribe(response => {
    console.log('POST Response:', response);
    loader.dismiss();
    let toast = this.tostctrl.create({
      message:'Signup Successfully',
      duration:2000
    });
    toast.present();
    this.navCtrl.push(LoginPage);
  }, error => {
    loader.dismiss();
    let toast = this.tostctrl.create({
      message:'Password Update Succesfully',
      duration:2000
    });
    toast.present();
  });
  }
  }

