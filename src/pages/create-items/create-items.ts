import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Nav,LoadingController, ToastController, Toast,Platform,IonicApp } from 'ionic-angular';
import {Http ,Response} from '@angular/http';
import {ItemPage} from '../item/item';
import {GlobalProvider} from '../../providers/global/global';
// import {FormBuilder,FormGroup,Validators,AbstractControl} from '@angular/forms';
import { HomePage } from '../home/home';
import { App } from 'ionic-angular';
import { Network } from '@ionic-native/network';
/**
 * Generated class for the CreateItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-items',
  templateUrl: 'create-items.html',
})
export class CreateItemsPage {
  @ViewChild(Nav) nav: Nav;
  // formgroup:FormGroup;

   name:any;
  sexe: string;
  units:any;
  sale_rate:any;
  sale_account:any;
  sale_tax:any;
  sale_desc:any;
  purchase_rate:any;
  purchase_account:any;
  purchase_desc:any;
  qty:any;
  alert:any;
  initialcash=0;
  public saleinformation:boolean=false;
  public purchaseinformation:boolean=false;
  constructor(public navCtrl: NavController,public network:Network,public platform: Platform,private ionicApp: IonicApp,public alertCtrl:AlertController, public app: App,public global:GlobalProvider,public navParams: NavParams, public http:Http,public loadingCtrl: LoadingController, public tostctrl: ToastController) {
 console.log(this.global.userid);
 console.log(this.global.initialcash);
//  this.formgroup = formbuilder.group({
//    name:['',Validators.required],
//    units:['',Validators.required]
//  });
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateItemsPage');
    this.platform.registerBackButtonAction(() => {
      let nav = this.app._appRoot._getActivePortal() || this.app.getActiveNav();
      let activeView = nav.getActive();
  
      if (activeView != null) {
        if (nav.canGoBack()) {
          this.navCtrl.push(HomePage);
        } else if(activeView.isOverlay) {
          activeView.dismiss();
        } else {
          this.navCtrl.push(HomePage);
          //this.closeApp();
        }
     
      }  
    
});
  }
  ionViewDidEnter(){
    console.log('ionViewDidLoad CreateContactPage');
    this.platform.registerBackButtonAction(() => {
      let nav = this.app._appRoot._getActivePortal() || this.app.getActiveNav();
      let activeView = nav.getActive();
  
      if (activeView != null) {
        if (nav.canGoBack()) {
          this.navCtrl.push(HomePage);
        } else if(activeView.isOverlay) {
          activeView.dismiss();
        } else {
          this.navCtrl.push(HomePage);
          //this.closeApp();
        }
     
      }  
    
});
  }
  
  createitem(){

    if(this.network.type === 'none'){
      this.alert = this.alertCtrl.create({
        title: 'Alert!',
        message: 'There is no Internet connection available, please proceed again when you have a connnection',
        buttons: [{
            text: 'OK',
            handler: () => {
             this.alert.dismiss();
            }
        }],
        cssClass: 'alertDanger'
    });
    this.alert.present();
  }
else{
  var salerate = +this.sale_rate;
  var purchaserate = +this.purchase_rate;
  if(this.sexe == "" || this.name == undefined || this.units == undefined || this.qty == undefined || this.sale_rate == undefined || this.purchase_rate == undefined){
    const alert = this.alertCtrl.create({
      title: 'Attention',
      message: 'Please Input All Mandatory Fields',
      buttons: [{
          text: 'OK',
          handler: () => {
            console.log("Cancel")
          }
      }],
      cssClass: 'alertDanger'
  });
  alert.present();
  }
  else if(salerate < purchaserate){
    const alert = this.alertCtrl.create({
      title: 'Attention',
      message: 'Purchase Cost must be less than Sale Cost',
      buttons: [{
          text: 'OK',
          handler: () => {
            console.log("Cancel")
          }
      }],
      cssClass: 'alertDanger'
  });
  alert.present();
  }
  else{
    console.log(this.sexe);
  let loader = this.loadingCtrl.create({
    content:'Waiting...'
  });
  loader.present();
  var totalitemcash = 0;
 totalitemcash = this.purchase_rate * this.qty;
 this.initialcash = this.global.initialcash - totalitemcash;

  let data1 = {
    intial_cash:this.initialcash
  };
  //console.log(this.data.username);
  this.http.post('https://sum-invoice-app.herokuapp.com/user/updateprofile/'+this.global.userid+'', data1)
      .subscribe(response => {
        console.log('POST Response:', response);
        loader.dismiss();
        //this.navCtrl.push(HomePage);
      }, error => {
      console.log("Oooops!");
      });



  //this.afd.list('Books/Books').push({name:this.name});
  let data = {
    item_name:this.name,
    item_type : this.sexe,
    unit:this.units,
    sale_rate: this.sale_rate,
    sale_tax:this.sale_tax,
    sale_desc:this.sale_desc,
    purchase_rate:this.purchase_rate,
    //purchase_account:this.purchase_account,
    purchase_desc:this.purchase_desc,
    item_quantity:this.qty,
    userId:this.global.userid
    //sale_account:this.sale_account

  };
  //console.log(this.data.username);
  this.http.post('https://sum-invoice-app.herokuapp.com/item/create', data)
      .subscribe(response => {
        console.log('POST Response:', response);
        loader.dismiss();
        let toast = this.tostctrl.create({
          message:'New Item Created Successfully',
          duration:2000
        });
        let nav = this.app.getActiveNavs()[0];
          let activeView = nav.getActive();   
          if(activeView.name === 'CreateItemsPage') {
            if (nav.canGoBack()){
                nav.pop();
            }else{
              const alert = this.alertCtrl.create({
                title: 'Exit',
                message: 'Want to Exit App?',
                buttons: [{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                      this.nav.setRoot('ItemPage');
                    }
                },{
                    text: 'OK',
                    handler: () => {
                      this.platform.exitApp();
                    }
                }]
            });
            alert.present();
            }
          } else {
          this.nav.setRoot('ItemPage');
          }
        toast.present();
      // this.navCtrl.push(ItemPage);
      }, error => {
        loader.dismiss();
        let toast = this.tostctrl.create({
          message:'Data not Save',
          duration:2000
        });
        toast.present();
       console.log("Oooops!");
      });
  }
}
}
  }