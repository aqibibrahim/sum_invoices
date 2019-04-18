import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController  } from 'ionic-angular';
import {CreateItemsPage} from '../create-items/create-items';
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
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,public http: Http) {
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
  itemTapped(item):void {
    //console.log(item.title);
    console.log(item._id);
    let alert = this.alertCtrl.create({
      title: item.title,
      inputs: [
        {
          name: 'username',
          placeholder: 'Username',
          
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text:'OK',
          role:'ok',
          handler:data=>{
            this.navCtrl.push(CreateInvoicesPage,{item_name: item.title});
          }
        }
      ]
    });
    alert.present();
  }
}
