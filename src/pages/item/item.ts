import { Component,NgModule  } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, Item,LoadingController, ToastController  } from 'ionic-angular';
import {CreateItemsPage} from '../create-items/create-items';
import {EdititemPage} from '../edititem/edititem';
import {CreateInvoicesPage} from '../create-invoices/create-invoices';
import {Http ,Response} from '@angular/http';
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
  selectedItem: any;
  items: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,public http: Http, public loadingCtrl: LoadingController, public tostctrl: ToastController) {
    this.selectedItem = navParams.get('item');
  
    this.http.get('https://sum-finance.herokuapp.com/item/get-all').map(res => res.json()).subscribe(data => {
      console.log(data);
         //this.posts = data.json();
         this.items = data 
         // for(var i=0;i<result.data.length;i++){
         //   this.posts = result.data[i].first_name;
         //   console.log(this.posts);
         // }
       });
}
ionViewDidEnter() {
  this.http.get('https://sum-finance.herokuapp.com/item/get-all').map(res => res.json()).subscribe(data => {
    console.log(data);
       //this.posts = data.json();
       this.items = data 
       // for(var i=0;i<result.data.length;i++){
       //   this.posts = result.data[i].first_name;
       //   console.log(this.posts);
       // }
     });
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemPage');
  }
  createcitems(){
    this.navCtrl.push(CreateItemsPage);
  }
  // itemTapped(event, item) {
  //   // That's right, we're pushing to ourselves!
  //   this.navCtrl.push(CreateInvoicesPage, {
  //     item: item
  //   });
  // }
  edititems(item):void {
    //console.log(item.title);
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
  this.http.post('https://sum-finance.herokuapp.com/item/delete/'+item._id+'', data)
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
