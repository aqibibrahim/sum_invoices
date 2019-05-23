import { Component } from '@angular/core';
import { NavController,LoadingController, ToastController } from 'ionic-angular';
import {Http ,Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginPage} from '../login/login';
import * as Inputmask from 'inputmask';
import { Directive, Attribute } from '@angular/core';
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})

export class SignupPage {
  myForm: FormGroup;
  pattern: string;

  isName: boolean = false;
  isEmail: boolean = false;
  isfullname: boolean = false;
  isPassword: boolean = false;
  iscountry: boolean = false;

  compname:any;
  fullname:any;
  email:any;
  password:any;
  country:any;

  constructor(
    
    public navCtrl: NavController,
    public fb: FormBuilder,public http: Http,public loadingCtrl: LoadingController, public tostctrl: ToastController) {
      
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      fullname:['',[Validators.required,Validators.pattern("[a-zA-Z ]*")]],
       country:['',[Validators.required]],
      email: ['', [Validators.required, Validators.email,Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/)]],
       //phone: ['',[Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    
  }
  
  validate(data){
    if(data == 'name'){
      this.isName = true;
    }
    else if(data == 'country'){
      this.iscountry = true;
    }
    else if(data == 'email'){
      this.isEmail = true;
    }
    else if(data == 'fullname'){
      this.isfullname = true;
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
      password: this.password,
      company_name: this.compname,
      user_name:this.fullname,
      country:this.country
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
      message:'User already esist',
      duration:2000
    });
    toast.present();
  console.log("Oooops!");
  });
  }

}