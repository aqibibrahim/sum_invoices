import { Component } from '@angular/core';
import { NavController,LoadingController, ToastController,AlertController  } from 'ionic-angular';
import {Http ,Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginPage} from '../login/login';
import * as Inputmask from 'inputmask';
import { Directive, Attribute } from '@angular/core';
import {SignupProvider}  from '../../providers/signup/signup';
import { IonicSelectableModule } from 'ionic-selectable';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
//import { AppAvailability, Device } from 'ionic-native';
import { Device } from '@ionic-native/device';
import { AppAvailability } from '@ionic-native/app-availability';
import { Platform } from 'ionic-angular';
import { CompleteTestServiceProvider } from '../../providers/complete-test-service/complete-test-service';
import {CreateYourCompanyPage} from '../create-your-company/create-your-company'
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
  country1:any;
  userid:any;
  countrypak:any;
  initialcash=0;

  verifystatus:any;
  constructor(
    public platform:Platform,
    public navCtrl: NavController,public afAuth: AngularFireAuth,
    public fb: FormBuilder, public device:Device ,public completeTestService: CompleteTestServiceProvider , public alertCtrl: AlertController,public appavail:AppAvailability , public http: Http,public loadingCtrl: LoadingController, public alrtctrl:AlertController, public tostctrl: ToastController) {
      
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      fullname:['',[Validators.required,Validators.pattern("[a-zA-Z ]*")]],
      //  country:['',[Validators.required]],
      email: ['', [Validators.required, Validators.email,Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/)]],
       //phone: ['',[Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    
    
  }

  filterItems(searchTerm){
    return this.country1.filter((item) => {
         return item.name.toLowerCase().includes(searchTerm.toLowerCase());
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
    else if(data == 'password'){
      this.isPassword = true;
    }
  }
  checkstatus(){
    if(firebase.auth().currentUser.emailVerified == false){
      //alert("")  
      const alert = this.alrtctrl.create({
        title: 'Verify Email Address',
        message: 'Check your email and verify',
        buttons: [{
            text: 'OK',
            handler: () => {
             this.checkstatus();
             //console.log(firebase.auth)
            }
        }]
    });
    alert.present();
    }
    else{
      
    }
  }
  submit(){
    console.log(this.country);
    
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
  .then(res => {
       // let user = firebase.auth().currentUser;
       // user.sendEmailVerification();
        resolve(res);
        console.log(res.user.emailVerified);
        this.verifystatus = res.user.emailVerified;
        this.sendEmailVerification();
        //this.signup.signup(this.email,this.password,this.compname,this.fullname,this.country);
        let data = {
          email:this.email,
          password: this.password,
          company_name: this.compname,
          user_name:this.fullname,
          country:this.country,
          intial_cash:this.initialcash
      };
        let loader = this.loadingCtrl.create({
            content:'Waiting...'
          });
          loader.present();
          
        this.http.post('https://sum-invoice-app.herokuapp.com/user/signup', data).map(response => response.json())
        .subscribe(data => {
          console.log('POST Response:', data);
          
          console.log(data.company_name)
          // this.company_name = data.company_name;
           this.userid = data._id;
          // this.countryname = data.country;
          // this.user_name = data.user_name;
          // this.user_email = data.email;
         let toast = this.tostctrl.create({
                message:'Signup Successfully',
                duration:2000
              });
             this.navCtrl.push(CreateYourCompanyPage,{companyname:this.compname,userid:this.userid,country:this.country,uname:this.fullname});
             loader.dismiss();
              toast.present();
           
        }, error => {
          let toast = this.tostctrl.create({
            message:'User already exist',
            duration:2000
          });
          loader.dismiss();
          toast.present();
        });
      }, err => {
        let alert = this.alertCtrl.create({
          title: 'Please Try Again !',
          cssClass: 'custom-alert-danger',
          message:  err ,
          buttons: ['OK']
        });
        alert.present();
    });
  }
    )
      
  }
  sendEmailVerification() {
    this.afAuth.authState.subscribe(user => {
        user.sendEmailVerification()
        .then(() => {
          console.log('email sent');
        })
      });
  }
}