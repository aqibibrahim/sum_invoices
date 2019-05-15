import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { createHostBinding } from '@angular/compiler/src/core';
import {LoginPage} from '../login/login';
import {SignupPage} from '../signup/signup';
/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
   
  }

  loginpage(){
  this.navCtrl.push(LoginPage);
  }
  signuppage(){
    this.navCtrl.push(SignupPage);
  }
}
