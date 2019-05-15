import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfitLossReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profit-loss-report',
  templateUrl: 'profit-loss-report.html',
})
export class ProfitLossReportPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.get('expenseamount'),this.navParams.get('purchaserate'),this.navParams.get('salerate'),this.navParams.get('quantity'));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfitLossReportPage');
  }

}
