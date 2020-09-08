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

 
getAllOutStandingforDashboard(UserCode): Observable<any> {  
  return this.http.get(this.BaseURI + '/Outstanding/GetOutstandingCount/'+UserCode);
} 
getAllCreditLimitforDashboard(UserCode): Observable<any> {  
  return this.http.get(this.BaseURI + '/Creditlimit/GetCreditlimit/'+UserCode);
} 

getCustomerData(Id) {
  return this.http.get(this.BaseURI + '/CustomerMaster/GetCustomerDataByUserId/'+Id);
}

GetShipToAddress(Id) {
  return this.http.get(this.BaseURI + '/CustomerMaster/GetShipToAddress/'+Id);
}

getGetShipToData(Id) {
  return this.http.get(this.BaseURI + '/CustomerMaster/GetShipTo/'+Id);
}

getUOM() {
  return this.http.get(this.BaseURI + '/Order/GetUOM/');
}
getUOMById(id) {
  return this.http.get(this.BaseURI + '/Order/GetUOMByID/'+id);
}
}
