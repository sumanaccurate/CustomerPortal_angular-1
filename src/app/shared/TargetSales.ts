import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class TargetSales {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
   }
  readonly BaseURI =  environment.ApiUrl;

 
  getTargetSalesforDashboard(UserCode,date): Observable<any> {  
    return this.http.get(this.BaseURI + '/TargetSales/GetTargetSalesForDashboardbyMonth/'+UserCode+','+date);
  } 
  getTargetSalesforDashboardBarChart(UserCode,date): Observable<any> {  
    return this.http.get(this.BaseURI + '/TargetSales/GetTargetSalesForDashboardbyYear/'+UserCode+','+date);
  } 
}
