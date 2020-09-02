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

  InsertOrderDetails(OrderDate): Observable<any> {
    return this.http.post(this.BaseURI + '/Order/InsertOrderDetails',OrderDate);
  } 

  getOrderInfo(): Observable<any> {

    return this.http.get(this.BaseURI + '/Order/GetReqOrderNo');
  } 
}