import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http ,Response} from '@angular/http';

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

  public saleinformation:boolean=false;
  public purchaseinformation:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateItemsPage');
  }
  createitem(){
    
    console.log(this.sexe);
    //this.afd.list('Books/Books').push({name:this.name});
    let data = {
      item_name:this.name,
      item_type : this.sexe,
      unit:this.units

  };
    //console.log(this.data.username);
    this.http.post('https://sum-finance.herokuapp.com/item/create', data)
        .subscribe(response => {
          console.log('POST Response:', response);
        }, error => {
        console.log("Oooops!");
        });
        }
  }

