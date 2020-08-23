import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
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
  readonly BaseURI =  environment.ApiUrl;


  login(formData) {
    return this.http.post(this.BaseURI + '/UserMasters/Login', formData);
  }

  GetCustomerData() {
    return this.http.get(this.BaseURI + '/CustomerMaster/GetCustomer');
  }

  
// getAllCustomer(Division,pageNo,pageSize) {  
//   return this.http.get(this.BaseURI + '/CustomerMaster/GetCustomerMaster?pageNo=' + pageNo+'&pageSize='+pageSize); 
// }  
 
getAllCustomer(Division,pageNo,pageSize,KeyWord) {  
  return this.http.get(this.BaseURI + '/CustomerMaster/GetCustomerMaster?Division=' + Division+'&pageNo='+pageNo+'&pageSize='+pageSize); 
}  
getAllCustomerCount(Division): Observable<any> {  
  return this.http.get(this.BaseURI + '/CustomerMaster/GetCustomerCount?Division=' +Division);
}  
}
