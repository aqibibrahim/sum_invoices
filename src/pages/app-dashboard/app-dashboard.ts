import { Component,ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import {Http ,Response} from '@angular/http';
import {GlobalProvider} from '../../providers/global/global';
/**
 * Generated class for the AppDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-app-dashboard',
  templateUrl: 'app-dashboard.html',
})
export class AppDashboardPage {
   @ViewChild('barCanvas') barCanvas;
   @ViewChild('doughnutCanvas') doughnutCanvas;
   @ViewChild('lineCanvas') lineCanvas;
 
  //////Dongut Chart Data(Payable)//////
  public sum : number = 0;
  invoices:any;
  fixedamount:any;
  fixedamountarray = [];
  //////Dongut Chart Data//////
  //////Dongut Chart Data(Receivable)//////
  public sum_rec : number = 0;
  invoices_rec:any;
  fixedamount_rec:any;
  fixedamountarray_rec = [];
  //////Dongut Chart Data//////

  ////////Expense Chart Value/////////
  expensevalue:any;
  ////////Expense Chart Value/////////
commonarray=[];
invoice_expense=[];
//expensevalue:any

   barChart: any;
   doughnutChart: any;
   lineChart: any;
   labels=[];
   data1=[];
   datarecord:any;
   constructor(public http:Http,public global:GlobalProvider) {
    let data = {
      startDate:"2019-01-01",
      endDate:"2019-12-31",
      itemid:"5d316e2d6927210017448277"
    }
    this.http.post('https://sum-finance-latest2.herokuapp.com/invoice/searchitem', data).map(response => response.json())
    .subscribe(data => {
      //response = jQuery.parseJSON(response);
      console.log(data);
      this.datarecord = data;
      for(var i=0;i<this.datarecord.length;i++){
          //this.labels.push(this.datarecord[i].Salerate);
          this.data1.push(this.datarecord[i].Salerate);
          // console.log(this.labels)
          // console.log(this.data1)
      }
      
    }, error => {
    console.log("Oooops!");
     });

    
          
   }
   ionViewDidLoad() {
    this.http.get('https://sum-finance-latest2.herokuapp.com/invoice/payable/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
      console.log(data);  
      if(data.length == 0){
        console.log("There is no invoice genrated by this user");
      }
        this.invoices = data 
        this.sum = 0;
        for(var i=0;i<this.invoices.length;i++){
          this.fixedamount = this.invoices[i].total_cost;
          this.fixedamountarray.push(this.fixedamount);
          
        }
        for(let i = 0; i<this.fixedamountarray.length; i++){
          //this.sum = this.sum + this.fixedamountarray[i];    
          this.sum += Number(this.fixedamountarray[i]);
        }
        console.log(this.sum);
        //this.doughnutChart.update();
         });
  
  
         this.http.get('https://sum-finance-latest2.herokuapp.com/invoice/status/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
          console.log(data);  
          if(data.length == 0){
            console.log("There is no invoice genrated by this user");
          }
            this.invoices_rec = data 
            this.sum_rec = 0;
          for(var i=0;i<this.invoices_rec.length;i++){
            this.fixedamount_rec = this.invoices_rec[i].total_cost;
            this.fixedamountarray_rec.push(this.fixedamount_rec);
          }
          for(let i = 0; i<this.fixedamountarray_rec.length; i++){
            this.sum_rec += Number(this.fixedamountarray_rec[i]);
          }
         
          this.commonarray.push(this.sum,this.sum_rec);
          console.log(this.commonarray);
          //this.barChart.update();
          //this.doughnutChart.update();
             });
             this.http.get('https://sum-finance-latest2.herokuapp.com/expense/getexpensebyUserId/'+this.global.userid+'').map(res => res.json()).subscribe(data => {
          console.log(data);  
          this.expensevalue = data[0].totalExpense;
          this.invoice_expense.push(this.sum_rec,this.expensevalue);

          console.log(this.invoice_expense);
          this.barChart.update();
          this.doughnutChart.update();
             });
            this.barChartMethod();
            this.doughnutChartMethod();
            this.lineChartMethod();
    }
 
   barChartMethod() {
 
     this.barChart = new Chart(this.barCanvas.nativeElement, {
       type: 'bar',
       data: {
         labels: ['Income', 'Expense'],
         datasets: [{
           label: 'Income & Expense',
           data: this.invoice_expense,
           backgroundColor: [
             'rgba(255, 99, 132, 0.2)',
             'rgba(54, 162, 235, 0.2)'
             
           ],
           borderColor: [
             'rgba(255,99,132,1)',
             'rgba(54, 162, 235, 1)'
             
           ], 
           borderWidth: 1
         }]
       },
       options: {
         scales: {
           yAxes: [{
             ticks: {
               beginAtZero: true
             }
           }]
         }
       }
     });
   }
 
   doughnutChartMethod() {
     this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
       type: 'doughnut',
       data: {
         labels: ['Payable', 'Receivable'],
         datasets: [{
           label: 'Total Receivable and Payables',
           data: this.commonarray,
           backgroundColor: [
             'rgba(255, 159, 64, 0.2)',
             'rgba(255, 99, 132, 0.2)'
           ],
           hoverBackgroundColor: [
             '#FFCE56',
             '#FF6384'
           ]
         }]
       }
       
     });
    
   }
 
   lineChartMethod() {
     this.lineChart = new Chart(this.lineCanvas.nativeElement, {
       type: 'line',
       data: {
         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
         datasets: [
           {
             label: 'Sell per week',
             fill: false,
             lineTension: 0.1,
             backgroundColor: 'rgba(75,192,192,0.4)',
             borderColor: 'rgba(75,192,192,1)',
             borderCapStyle: 'butt',
             borderDash: [],
             borderDashOffset: 0.0,
             borderJoinStyle: 'miter',
             pointBorderColor: 'rgba(75,192,192,1)',
             pointBackgroundColor: '#fff',
             pointBorderWidth: 1,
             pointHoverRadius: 5,
             pointHoverBackgroundColor: 'rgba(75,192,192,1)',
             pointHoverBorderColor: 'rgba(220,220,220,1)',
             pointHoverBorderWidth: 2,
             pointRadius: 1,
             pointHitRadius: 10,
             data: [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
             spanGaps: false,
           }
         ]
       }
     });
   }
 
}
