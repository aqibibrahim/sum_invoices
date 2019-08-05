import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http ,Response } from '@angular/http';
import {LoginPage} from '../login/login';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
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
  
  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth,public navParams: NavParams,public fb: FormBuilder,public http: Http,public loadingCtrl: LoadingController, public tostctrl: ToastController) {
    this.myForm = this.fb.group({
     
      email: ['', [Validators.required, Validators.email,Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/)]],
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
    if(firebase.auth().currentUser.email == this.email){
      console.log(firebase.auth().currentUser.email);
      let loader = this.loadingCtrl.create({
        content:'Waiting...'
      });
      loader.present();
      let data = {
        email:this.email,
        password: this.password
    };
    this.http.post('https://sum-finance-latest2.herokuapp.com/user/forget', data)
    .subscribe(response => {
      console.log('POST Response:', response);
      
      let toast = this.tostctrl.create({
        message:'Update Successfully',
        duration:2000
      });
      loader.dismiss();
      toast.present();
      this.navCtrl.push(LoginPage);
    }, error => {
      loader.dismiss();
      let toast = this.tostctrl.create({
        message:'Email id not Exist',
        duration:2000
      });
      toast.present();
      return false;
    });
    }
    else{
      alert("Email does not exist");
    }
  }
  }

  
 