import { Component,NgModule,ViewChild, OnInit  } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Nav, Item,LoadingController, ToastController,Navbar,Platform  } from 'ionic-angular';
import {CreateItemsPage} from '../create-items/create-items';
import {EdititemPage} from '../edititem/edititem';
import {CreateInvoicesPage} from '../create-invoices/create-invoices';
import {Http ,Response} from '@angular/http';
import {GlobalProvider} from '../../providers/global/global';
import {HomePage} from '../home/home';
import { App } from 'ionic-angular';
import { Network } from '@ionic-native/network';
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
  @ViewChild(Nav) nav: Nav;
  @ViewChild("cc") cardContent : any;
  selectedItem: any;
  alert:any;
  items: any;
  itemssort:any;
  accordianExpanded = false;
  
  constructor(public navCtrl: NavController, private network: Network,public global:GlobalProvider,public app: App,public platform:Platform,public navParams: NavParams, private alertCtrl: AlertController,public http: Http, public loadingCtrl: LoadingController, public tostctrl: ToastController) {
    this.network.onConnect().subscribe(()=> {
      console.log('Connected Constructor');
     });

     this.network.onDisconnect().subscribe(()=> {
       console.log('Disonnected Constructor');
     });
  
    
    this.selectedItem = navParams.get('item');
    console.log(this.global.userid);
    this.http.get('https://sum-finance-latest2.herokuapp.com/item/getByUserId/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
      console.log(data);
      if(data.length == 0){
        this.alert = this.alertCtrl.create({
          title: 'Oh Snap!',
          message: 'We do not have any Item for this company',
          buttons: [{
              text: 'Please add your First Item',
              handler: () => {
               this.navCtrl.push(CreateItemsPage);
              }
          }],
          cssClass: 'alertDanger'
      });
      this.alert.present();
      
      }
      data.sort((a, b) => a.item_name.localeCompare(b.item_name))
      console.log(data);
         this.items = data;

         console.log(this.items);
        //this.itemssort = this.items.
       });
       //this.platform.registerBackButtonAction(()=>this.myHandlerFunction());
    
}
ngOnInit(){
  console.log(this.cardContent);
}
ionViewDidEnter() {
  this.http.get('https://sum-invoice-app.herokuapp.com/item/getByUserId/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
    console.log(data);
      
    data.sort((a, b) => a.item_name.localeCompare(b.item_name))
    console.log(data);
       this.items = data;
     });
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemPage');
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
  
  createcitems(){
    this.navCtrl.push(CreateItemsPage);
  }
  
  edititems(item):void {
    console.log(item._id);
    this.navCtrl.push(EdititemPage,{id:item._id})
}
removeItem(item):void{
  const alert = this.alertCtrl.create({
    title: 'Items Delete',
    message: 'Do you Want to Delete this Item',
    buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
                            }
    },{
        text: 'OK',
        handler: () => {
          let loader = this.loadingCtrl.create({
            content:'Waiting...'
          });
          loader.present();
          let data={
            id:item._id
          }
          this.http.post('https://sum-invoice-app.herokuapp.com/item/delete/'+item._id+'', data)
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
    }]
});
alert.present();
}
toggleAccordian(){

}
}

