import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class SystemAdminService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
   }
  readonly BaseURI = 'https://localhost:44354';


  login(formData) {
    return this.http.post(this.BaseURI + '/UserMasters/Login', formData);
  }

  GetCustomerData() {
    return this.http.get(this.BaseURI + '/CustomerMaster/GetCustomer');
  }

  getUserProfile() {
    return this.http.get(this.BaseURI + '/UserProfile');
  }
}
