import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class DeliveryOrderService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  constructor( public datepipe: DatePipe,private fb: FormBuilder, private http: HttpClient,) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }
  readonly BaseURI = environment.ApiUrl;


  getAllOrderData(fromdate,todate,status,SoldToPartyCodevtxt, pageNo, DataPerPage, KeyWord) {
    if (fromdate == null || fromdate == "") {
      fromdate = new Date();
      fromdate = new Date(fromdate);
      fromdate.setDate(fromdate.getDate() - 10);
      fromdate = this.datepipe.transform(fromdate, 'yyyy-MM-dd');
    } 
    // else {
    //   fromdate = this.datepipe.transform(fromdate, 'yyyy-MM-dd');
    // }
    if (todate == null || todate == "") {
      todate = new Date();
      todate = this.datepipe.transform(todate, 'yyyy-MM-dd');
    }
    //  else {
    //   todate = this.datepipe.transform(todate, 'yyyy-MM-dd');
    // }
    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/DeliveryOrder/GetDeliveryOrderSearch/'+fromdate + ',' +todate + ',' +status + ',' + SoldToPartyCodevtxt + ',' + pageNo + ',' + DataPerPage + ',' + KeyWord);
  }
  getAllOrderDataByOrderNo(no) {
    return this.http.get(this.BaseURI + '/DeliveryOrder/GetDeliveryOrderByOrderNo/' + no);
  }
  getDeliveryOrderHeaderDataByOrderNo(no) {
    return this.http.get(this.BaseURI + '/DeliveryOrder/GetDeliveryOrderHeaderByOrderNo/' + no);
  }
  getAllOrderCount(fromdate,todate,status,SoldToPartyCode, KeyWord): Observable<any> {
    if (fromdate == null || fromdate == "") {
      fromdate = new Date();
      fromdate = new Date(fromdate);
      fromdate.setDate(fromdate.getDate() - 10);
      fromdate = this.datepipe.transform(fromdate, 'yyyy-MM-dd');
    }
    //  else {
    //   fromdate = this.datepipe.transform(fromdate, 'yyyy-MM-dd');
    // }
    if (todate == null || todate == "") {
      todate = new Date();
      todate = this.datepipe.transform(todate, 'yyyy-MM-dd');
    } 
    // else {
    //   todate = this.datepipe.transform(todate, 'yyyy-MM-dd');
    // }
    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/DeliveryOrder/GetDeliveryOrderCount/' +fromdate + ',' +todate+ ',' +status+ ',' +SoldToPartyCode + ',' + KeyWord);
  }
  getAllOrdersCountforDashboard(UserCode): Observable<any> {

    return this.http.get(this.BaseURI + '/DeliveryOrder/getAllOrdersCountforCustomerDashboard/' + UserCode );
  }
  downloadFile(fromdate, todate, status, SoldToPartyCodevtxt, KeyWord): any {

    if (fromdate == null || fromdate == "") {
      fromdate = new Date();
      fromdate = new Date(fromdate);
      fromdate.setDate(fromdate.getDate() - 10);
      fromdate = this.datepipe.transform(fromdate, 'yyyy-MM-dd');
    } 
    // else {
    //   fromdate = this.datepipe.transform(fromdate, 'yyyy-MM-dd');
    // }
    if (todate == null || todate == "") {
      todate = new Date();
      todate = this.datepipe.transform(todate, 'yyyy-MM-dd');
    }
    //  else {
    //   todate = this.datepipe.transform(todate, 'yyyy-MM-dd');
    // }
    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/DeliveryOrder/Excel/' + fromdate + ',' + todate + ',' + status + ',' + SoldToPartyCodevtxt + ',' + KeyWord, { responseType: 'blob' });
  }
}