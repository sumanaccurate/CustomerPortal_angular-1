import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
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
getAllInvoiceData(SoldToPartyCodevtxt,pageNo,DataPerPage,KeyWord) {  
  if(KeyWord==null ||KeyWord==""){
    KeyWord="NoSearch";
  }
  return this.http.get(this.BaseURI + '/InvoiceMaster/GetInvoice/'+SoldToPartyCodevtxt+','+pageNo+','+DataPerPage+','+KeyWord); 
}  
getAllInvoiceCount(SoldToPartyCode,KeyWord): Observable<any> {  
  if(KeyWord==null ||KeyWord==""){
    KeyWord="NoSearch";
  }
  return this.http.get(this.BaseURI + '/InvoiceMaster/GetInvoiceCount/'+SoldToPartyCode+','+KeyWord);
}  
getAllInvoiceDataByInvoiceNo(no) {  
  return this.http.get(this.BaseURI + '/InvoiceMaster/getAllInvoiceDataByInvoiceNo/'+no); 
}  
getInvoiceHeaderDataByInvoiceNo(no) {  
  return this.http.get(this.BaseURI + '/InvoiceMaster/getInvoiceHeaderDataByInvoiceNo/'+no); 
}  
getAllSalesOrderDataByOrderNo(no): Observable<any> {  
  return this.http.get(this.BaseURI + '/SalesOrder/getAllSalesOrderDataByOrderNo/'+no);
} 
getAllDeliveryOrderDataBySalesOrderNo(no): Observable<any> {  
  return this.http.get(this.BaseURI + '/DeliveryOrder/getAllDeliveryOrderDataBySalesOrderNo/'+no);
} 
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
getAllOrdersCountforDashboard(UserCode): Observable<any> {  
 
  return this.http.get(this.BaseURI + '/DeliveryOrder/GetDeliveryOrderCount/'+UserCode+',NoSearch');
}  
getAllOutStandingforDashboard(UserCode): Observable<any> {  
  return this.http.get(this.BaseURI + '/Outstanding/GetOutstandingCount/'+UserCode);
} 
getAllCreditLimitforDashboard(UserCode): Observable<any> {  
  return this.http.get(this.BaseURI + '/Creditlimit/GetCreditlimit/'+UserCode);
} 
getAllSalesOrderforDashboard(UserCode): Observable<any> {  
 
  return this.http.get(this.BaseURI + '/SalesOrder/GetSalesOrderCount/'+UserCode+',NoSearch');
}  
}
