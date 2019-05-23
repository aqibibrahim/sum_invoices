import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Toast } from 'ionic-angular';
import {Http ,Response} from '@angular/http';
import {ItemPage} from '../item/item';
import {GlobalProvider} from '../../providers/global/global';
import {FormBuilder,FormGroup,Validators,AbstractControl} from '@angular/forms';
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
  formgroup:FormGroup;

  name:AbstractControl;
  sexe: string;
  units:AbstractControl;
  sale_rate:any;
  sale_account:any;
  sale_tax:any;
  sale_desc:any;
  purchase_rate:any;
  purchase_account:any;
  purchase_desc:any;
  qty:any;
  public saleinformation:boolean=false;
  public purchaseinformation:boolean=false;
  constructor(public navCtrl: NavController,public formbuilder:FormBuilder ,public global:GlobalProvider,public navParams: NavParams, public http:Http,public loadingCtrl: LoadingController, public tostctrl: ToastController) {
 console.log(this.global.userid);
 this.formgroup = formbuilder.group({
   name:['',Validators.required],
   units:['',Validators.required]
 });
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateItemsPage');
  }
  createitem(){
    if(this.sexe == "" || this.name == undefined || this.units == undefined || this.qty == undefined || this.sale_rate == undefined || this.sale_account == undefined || this.sale_tax == undefined || this.sale_desc == undefined
    || this.purchase_rate == undefined || this.purchase_account == undefined || this.purchase_desc == undefined){
      alert ("Please fill all the fields");
    }
    else{
      console.log(this.sexe);
    let loader = this.loadingCtrl.create({
      content:'Waiting...'
    });
    loader.present();
    //this.afd.list('Books/Books').push({name:this.name});
    let data = {
      item_name:this.name,
      item_type : this.sexe,
      unit:this.units,
      sale_rate: this.sale_rate,
      sale_tax:this.sale_tax,
      sale_desc:this.sale_desc,
      purchase_rate:this.purchase_rate,
      purchase_account:this.purchase_account,
      purchase_desc:this.purchase_desc,
      item_quantity:this.qty,
      userId:this.global.userid, 
      sale_account:this.sale_account

    };
    //console.log(this.data.username);
    this.http.post('https://sum-finance-latest2.herokuapp.com/item/create', data)
        .subscribe(response => {
          console.log('POST Response:', response);
          loader.dismiss();
          let toast = this.tostctrl.create({
            message:'Data Save',
            duration:2000
          });
          toast.present();
        this.navCtrl.push(ItemPage);
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