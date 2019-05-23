import { Component,NgModule,ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, Item,LoadingController, ToastController,Navbar  } from 'ionic-angular';
import {CreateItemsPage} from '../create-items/create-items';
import {EdititemPage} from '../edititem/edititem';
import {CreateInvoicesPage} from '../create-invoices/create-invoices';
import {Http ,Response} from '@angular/http';
import {GlobalProvider} from '../../providers/global/global';
import {HomePage} from '../home/home';
//import { AngularFireDatabase } from 'angularfire2/database';
/**
 * Generated class for the ItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {
  @ViewChild(Navbar) navBar: Navbar;
  selectedItem: any;
  items: any;
  
  constructor(public navCtrl: NavController, public global:GlobalProvider,public navParams: NavParams, private alertCtrl: AlertController,public http: Http, public loadingCtrl: LoadingController, public tostctrl: ToastController) {
    this.selectedItem = navParams.get('item');
    console.log(this.global.userid);
    this.http.get('https://sum-finance-latest2.herokuapp.com/item/getByUserId/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
      console.log(data);
         this.items = data
       });
}
ionViewDidEnter() {
  this.http.get('https://sum-finance-latest2.herokuapp.com/item/getByUserId/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
    console.log(data);
      
       this.items = data 
       
     });
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemPage');
    this.setBackButtonAction();
  }
  setBackButtonAction(){
    this.navBar.backButtonClick = () => {
    //alert("Where you want to go");
    this.navCtrl.push(HomePage);
     //this.navCtrl.pop()
    }
  }
  createcitems(){
    this.navCtrl.push(CreateItemsPage);
  }
  
  edititems(item):void {
    console.log(item._id);
    this.navCtrl.push(EdititemPage,{id:item._id})
}
removeItem(item):void{
  let loader = this.loadingCtrl.create({
    content:'Waiting...'
  });
  loader.present();
  let data={
    id:item._id
  }
  this.http.post('https://sum-finance-latest2.herokuapp.com/item/delete/'+item._id+'', data)
  .subscribe(res => {
    
    loader.dismiss();
          let toast = this.tostctrl.create({
            message:'Item Delete Successfully',
            duration:2000
          });
          toast.present();
    this.ionViewDidEnter();
  }, err => {
    loader.dismiss();
          let toast = this.tostctrl.create({
            message:'Item not Delete',
            duration:2000
          });
          toast.present();
   
  });
}

}
