import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }
  readonly BaseURI = environment.ApiUrl;

  InsertOrderHeader(OrderDate): Observable<any> {
    return this.http.post(this.BaseURI + '/Order/InsertOrderHeader',OrderDate);
  }   

  UpdateOrderHeader(OrderDate): Observable<any> {
    return this.http.put(this.BaseURI + '/Order/UpdateOrderHeader',OrderDate);
  }   

  DeleteOrderDetails(OrderID): Observable<any> {
    return this.http.delete(this.BaseURI + '/Order/DeleteOrderDetails/'+OrderID);
  } 

  InsertOrderDetails(OrderDate): Observable<any> {
    return this.http.post(this.BaseURI + '/Order/InsertOrderDetails',OrderDate);
  } 

  
  GetOrderDetails(fromdate, todate, status, customercode, PageNo, PageSize, KeyWord): Observable<any> {
    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    } if (fromdate == null || fromdate == "") {
      fromdate = "NoSearch";
    } if (todate == null || todate == "") {
      todate = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/Order/GetOrdersByCustomerCode/'+fromdate+','+todate+','+status+','+customercode+','+PageNo+','+PageSize+','+KeyWord);
  } 

  getOrderCount(fromdate, todate, status, customercode, KeyWord): Observable<any> {
    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    } if (fromdate == null || fromdate == "") {
      fromdate = "NoSearch";
    } if (todate == null || todate == "") {
      todate = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/Order/GetOrdersByCustomerCodeCount/' + fromdate+','+todate+','+status+','+customercode+','+KeyWord);
  }
  getOrderInfo(): Observable<any> {

    return this.http.get(this.BaseURI + '/Order/GetReqOrderNo');
  } 



  
  GetOrderDetailsByOrderID(no) {
    return this.http.get(this.BaseURI + '/Order/GetOrderDetailsByOrderID/' + no);
  }
  
  GetOrderHeaderByOrderID(no) {
    return this.http.get(this.BaseURI + '/Order/GetOrderHeaderByOrderID/' + no);
  }
}