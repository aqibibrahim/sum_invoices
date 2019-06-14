import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
 
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import {ExpensebycategoryreportPage} from '../expensebycategoryreport/expensebycategoryreport';
/**
 * Generated class for the ExpenseCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-expense-category',
  templateUrl: 'expense-category.html',
})
export class ExpenseCategoryPage {

  expensename:any;
  fromdate:any;
  todate:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpenseCategoryPage');
  }
  run_report_expense_by_category(){
    if(this.todate == undefined){
      alert("Please add Due Date")
    }
    else if(this.fromdate == undefined) {
      alert("Please choose From Date");
    }

    else if(this.expensename==undefined){
      alert("Please Select Expense Name");
    }
    //console.log(this.fromdate, this.todate);
    else if(this.fromdate > this.todate)
  {
      alert ("Due Date must be greater than Invoice Date")
  }else{
         this.navCtrl.push(ExpensebycategoryreportPage,{startdate:this.fromdate,enddate:this.todate,expensename:this.expensename});
  }

}
}
