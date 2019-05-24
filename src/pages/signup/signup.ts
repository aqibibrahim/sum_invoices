import { Component } from '@angular/core';
import { NavController,LoadingController, ToastController } from 'ionic-angular';
import {Http ,Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginPage} from '../login/login';
import * as Inputmask from 'inputmask';
import { Directive, Attribute } from '@angular/core';
import {SignupProvider}  from '../../providers/signup/signup';
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
    public fb: FormBuilder,public http: Http,public loadingCtrl: LoadingController, public tostctrl: ToastController, public signup:SignupProvider) {
      
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
      this.signup.signup(this.email,this.password,this.compname,this.fullname,this.country);
  }

}