import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import {Http ,Response} from '@angular/http';
/**
/*
  Generated class for the ReportsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReportsProvider {

  constructor(public http: HttpClient,public loadingCtrl:LoadingController) {
    console.log('Hello ReportsProvider Provider');
  }

  salesbyitemreport(startdate,enddate,itemmid){

  }
}
