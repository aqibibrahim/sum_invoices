import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http ,Response} from '@angular/http';
import {ItemPage} from '../item/item'
/**
 * Generated class for the EdititemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edititem',
  templateUrl: 'edititem.html',
})
export class EdititemPage {
  id:any;
  
  items:any;
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
  public check1:boolean=false;
  public purchaseinformation:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {
    this.id= this.navParams.get('id');
    console.log(this.id);
    let data = {
      getid : this.id
    }

    // this.http.post('https://sum-finance.herokuapp.com/item/get/"'+this.id+'"').map(res => res.json()).subscribe(data => {
    //   console.log(data);
    //      //this.posts = data.json();
    //      this.items = data 
    //      // for(var i=0;i<result.data.length;i++){
    //      //   this.posts = result.data[i].first_name;
    //      //   console.log(this.posts);
    //      // }

    //    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EdititemPage');
  }
  updateitem(){
    let data = {
      item_name:this.name,
      item_type : this.sexe,
      unit:this.units,
      sale_rate: this.sale_rate,
      sale_tax:this.sale_tax,
      sale_desc:this.sale_desc,
      purchase_rate:this.purchase_rate,
      purchase_account:this.purchase_account,
      purchase_desc:this.purchase_desc
    };
    //console.log(this.data.username);
    this.http.post('https://sum-finance.herokuapp.com/item/update/'+this.id+'', data)
        .subscribe(response => {
          console.log('POST Response:', response);
          this.navCtrl.push(ItemPage);
        }, error => {
        console.log("Oooops!");
        });
        }
  }

