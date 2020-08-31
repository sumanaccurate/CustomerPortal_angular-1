import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class DeliveryOrderService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
   }
  readonly BaseURI =  environment.ApiUrl;


getAllOrderData(SoldToPartyCodevtxt,pageNo,DataPerPage,KeyWord) {  
    if(KeyWord==null ||KeyWord==""){
      KeyWord="NoSearch";
    }
    return this.http.get(this.BaseURI + '/DeliveryOrder/GetDeliveryOrder/'+SoldToPartyCodevtxt+','+pageNo+','+DataPerPage+','+KeyWord); 
  }  
  getAllOrderDataByOrderNo(no) {  
    return this.http.get(this.BaseURI + '/DeliveryOrder/GetDeliveryOrderByOrderNo/'+no); 
  } 
  getDeliveryOrderHeaderDataByOrderNo(no) {  
    return this.http.get(this.BaseURI + '/DeliveryOrder/GetDeliveryOrderHeaderByOrderNo/'+no); 
  }   
  getAllOrderCount(SoldToPartyCode,KeyWord): Observable<any> {  
    if(KeyWord==null ||KeyWord==""){
      KeyWord="NoSearch";
    }
    return this.http.get(this.BaseURI + '/DeliveryOrder/GetDeliveryOrderCount/'+SoldToPartyCode+','+KeyWord);
  }  
  getAllDeliveryOrderDataBySalesOrderNo(no): Observable<any> {  
    return this.http.get(this.BaseURI + '/DeliveryOrder/getAllDeliveryOrderDataBySalesOrderNo/'+no);
  } 
  getAllOrdersCountforDashboard(UserCode): Observable<any> {  
   
    return this.http.get(this.BaseURI + '/DeliveryOrder/GetDeliveryOrderCount/'+UserCode+',NoSearch');
  }  
}