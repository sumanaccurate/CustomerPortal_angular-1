import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { DatePipe } from '@angular/common'
import { environment } from '../../environments/environment';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  constructor(private fb: FormBuilder, private http: HttpClient,public datepipe: DatePipe) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }
  readonly BaseURI = environment.ApiUrl;

  InsertOrderHeader(OrderDate): Observable<any> {
    return this.http.post(this.BaseURI + '/Order/InsertOrderHeader', OrderDate);
  }

  UpdateOrderHeader(OrderDate): Observable<any> {
    return this.http.put(this.BaseURI + '/Order/UpdateOrderHeader', OrderDate);
  }

  DeleteOrderDetails(OrderID): Observable<any> {
    return this.http.delete(this.BaseURI + '/Order/DeleteOrderDetails/' + OrderID);
  }

  InsertOrderDetails(OrderDate): Observable<any> {
    return this.http.post(this.BaseURI + '/Order/InsertOrderDetails', OrderDate);
  }


  GetOrderDetails(fromdate, todate, status, customercode, PageNo, PageSize, KeyWord): Observable<any> {
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
    return this.http.get(this.BaseURI + '/Order/GetOrdersByCustomerCode/' + fromdate + ',' + todate + ',' + status + ',' + customercode + ',' + PageNo + ',' + PageSize + ',' + KeyWord);
  }

  GetAllOrderDetails(fromdate, todate, status, PageNo, PageSize, KeyWord): Observable<any> {
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
    return this.http.get(this.BaseURI + '/Order/GetAllOrderLists/' + fromdate + ',' + todate + ',' + status + ',' + PageNo + ',' + PageSize + ',' + KeyWord);
  }

  getOrderCount(fromdate, todate, status, customercode, KeyWord): Observable<any> {
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
    return this.http.get(this.BaseURI + '/Order/GetOrdersByCustomerCodeCount/' + fromdate + ',' + todate + ',' + status + ',' + customercode + ',' + KeyWord);
  }

  getAllOrderCount(fromdate, todate, status, KeyWord): Observable<any> {
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
    //  else {
    //   todate = this.datepipe.transform(todate, 'yyyy-MM-dd');
    // }
    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/Order/GetAllOrdersCount/' + fromdate + ',' + todate + ',' + status + ',' + KeyWord);
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
    // else {
    //   todate = this.datepipe.transform(todate, 'yyyy-MM-dd');
    // }
    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/Order/Excel/' + fromdate + ',' + todate + ',' + status + ',' + SoldToPartyCodevtxt + ',' + KeyWord, { responseType: 'blob' });
  }
}