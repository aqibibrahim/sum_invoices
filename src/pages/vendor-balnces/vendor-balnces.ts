import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {Http} from "@angular/http";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { Chart } from 'chart.js';
import 'rxjs/add/operator/map';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
/**
 * Generated class for the VendorBalncesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vendor-balnces',
  templateUrl: 'vendor-balnces.html',
})
export class VendorBalncesPage {
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild(Slides) slides:Slides;

  barChart: any;
  doughnutChart: any;
  lineChart: any;

  pages:any = [];
  id:any = 1;
  endOfList:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http) {
  }
  ngOnInit(){
    this.http.get('https://jsonplaceholder.typicode.com/posts/1').map(res => res.json()).subscribe(data => {
      console.log(JSON.stringify(data,null,4));
      this.pages = data;
    });
  }

  RetriveData(id){
    if(id == 1){
      this.endOfList = true;
      this.id = 1;
      alert('Start of list');
    }else{
      this.http.get('https://jsonplaceholder.typicode.com/posts/'+id).map(res => res.json()).subscribe(data => {
        console.log(JSON.stringify(data,null,4));
        this.pages = data;
      });
    }
  }

  left(){
    this.RetriveData(this.id-1);
    this.id = this.id-1;
  }

  right(){
    this.RetriveData(this.id+1);
    this.id = this.id+1;
  }

  swipeEvent($event) : Promise<any>{
    console.log($event);
    return new Promise((resolve) => {
      setTimeout(() => {
        if($event.direction == '4'){
          this.RetriveData(this.id-1);
          this.id = this.id-1;
          this.barChart = new Chart(this.barCanvas.nativeElement, {

            type: 'bar',
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3, 18, 17, 90, 23, 34, 45],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 199, 132, 0.2)',
                        'rgba(54, 142, 235, 0.2)',
                        'rgba(255, 106, 86, 0.2)',
                        'rgba(75, 182, 192, 0.2)',
                        'rgba(153, 202, 255, 0.2)',
                        'rgba(255, 259, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 153, 64, 1)',
                        'rgba(54, 112, 235, 1)',
                        'rgba(255, 216, 86, 1)',
                        'rgba(75, 172, 192, 1)',
                        'rgba(153, 101, 255, 1)',
                        'rgba(255, 153, 64, 1)',
                        'rgba(255,92,132,1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
      
        });

        }
        else if($event.direction == '2'){
          this.RetriveData(this.id+1);
          this.id = this.id+1;
          this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

            type: 'doughnut',
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3, 18, 17, 90, 23, 34, 45],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 199, 132, 0.2)',
                        'rgba(54, 142, 235, 0.2)',
                        'rgba(255, 106, 86, 0.2)',
                        'rgba(75, 182, 192, 0.2)',
                        'rgba(153, 202, 255, 0.2)',
                        'rgba(255, 259, 64, 0.2)'
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#FF6381",
                        "#36A3EB",
                        "#FFCE26",
                        "#FF6374",
                        "#33A2EB",
                        "#FFCE53",
                    ]
                }]
            }
      
        });
        }
        console.log('Async operation has ended');
        resolve();
      }, 500);
    })
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad VendorBalncesPage');
    setTimeout(()=>
   this.slides.slideTo(1,1000)
   ,1000);
   
    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3, 18, 17, 90, 23, 34, 45],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 199, 132, 0.2)',
                  'rgba(54, 142, 235, 0.2)',
                  'rgba(255, 106, 86, 0.2)',
                  'rgba(75, 182, 192, 0.2)',
                  'rgba(153, 202, 255, 0.2)',
                  'rgba(255, 259, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 153, 64, 1)',
                  'rgba(54, 112, 235, 1)',
                  'rgba(255, 216, 86, 1)',
                  'rgba(75, 172, 192, 1)',
                  'rgba(153, 101, 255, 1)',
                  'rgba(255, 153, 64, 1)',
                  'rgba(255,92,132,1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }

  });

  this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

      type: 'doughnut',
      data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3, 18, 17, 90, 23, 34, 45],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 199, 132, 0.2)',
                  'rgba(54, 142, 235, 0.2)',
                  'rgba(255, 106, 86, 0.2)',
                  'rgba(75, 182, 192, 0.2)',
                  'rgba(153, 202, 255, 0.2)',
                  'rgba(255, 259, 64, 0.2)'
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#FF6381",
                  "#36A3EB",
                  "#FFCE26",
                  "#FF6374",
                  "#33A2EB",
                  "#FFCE53",
              ]
          }]
      }

  });

  this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
              {
                  label: "My First dataset",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(75,192,192,0.4)",
                  borderColor: "rgba(75,192,192,1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: [12, 19, 3, 5, 2, 3, 18, 17, 90, 23, 34, 45],
                  spanGaps: false,
              }
          ]
      }

  });
  }

  // swipeEvent(e) {
  //   console.log('swiped');
  // }
}
