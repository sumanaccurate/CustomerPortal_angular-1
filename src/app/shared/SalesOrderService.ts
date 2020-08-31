import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class SalesOrderService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
   }
  readonly BaseURI =  environment.ApiUrl;


getSalesOrderHeaderDataByOrderNo(no): Observable<any> {  
    return this.http.get(this.BaseURI + '/SalesOrder/getAllSalesOrderHeaderDataByOrderNo/'+no);
  } 
  getAllSalesOrderData(SoldToPartyCodevtxt,pageNo,DataPerPage,KeyWord) {  
    if(KeyWord==null ||KeyWord==""){
      KeyWord="NoSearch";
    }
    return this.http.get(this.BaseURI + '/SalesOrder/GetSalesOrder/'+SoldToPartyCodevtxt+','+pageNo+','+DataPerPage+','+KeyWord); 
  }  
  getAllSalesOrderCount(SoldToPartyCode,KeyWord): Observable<any> {  
    if(KeyWord==null ||KeyWord==""){
      KeyWord="NoSearch";
    }
    return this.http.get(this.BaseURI + '/SalesOrder/GetSalesOrderCount/'+SoldToPartyCode+','+KeyWord);
  }  

  
getAllSalesOrderforDashboard(UserCode): Observable<any> {  
 
    return this.http.get(this.BaseURI + '/SalesOrder/GetSalesOrderCount/'+UserCode+',NoSearch');
  }  

  
getAllSalesOrderDataByOrderNo(no): Observable<any> {  
    return this.http.get(this.BaseURI + '/SalesOrder/getAllSalesOrderDataByOrderNo/'+no);
  } 

}