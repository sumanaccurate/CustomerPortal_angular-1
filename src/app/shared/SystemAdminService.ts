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
  return this.http.get(this.BaseURI + '/CustomerMaster/GetCustomerMaster/'+Division+','+pageNo+','+pageSize+','+KeyWord); 
}  
getAllCustomerCount(Division): Observable<any> {  
  return this.http.get(this.BaseURI + '/CustomerMaster/GetCustomerCount/'+Division);
}  

uploadExcelData(formdata) {  
  return this.http.post(this.BaseURI + '/Mail/ExcelUpload',formdata);
}  
uploadTargetSalesExcelData(formdata) {  
  return this.http.post(this.BaseURI + '/TargetSales/TargetSalesExcelUpload',formdata);
}
DownloadTargetSalesExcelData(Division,KeyWord) {  
  if (KeyWord == null || KeyWord == "") {
    KeyWord = "NoSearch";
  }
  return this.http.get(this.BaseURI + '/TargetSales/Excel/'+Division+','+KeyWord, { responseType: 'blob' });
}
GetAllTargetSalesExcelData(Division,pageNo,pageSize,KeyWord) {  
  if (KeyWord == null || KeyWord == "") {
    KeyWord = "NoSearch";
  }
  return this.http.get(this.BaseURI + '/TargetSales/GetAllTargetSalesLists/'+Division+','+pageNo+','+pageSize+','+KeyWord);
}

DownloadSampleExcel() {  
  return this.http.get(this.BaseURI + '/TargetSales/DownloadSampleExcel', { responseType: 'blob' });
}
getTargetSalesExcelDataCount(Division,KeyWord) {  
  if (KeyWord == null || KeyWord == "") {
    KeyWord = "NoSearch";
  }
  return this.http.get(this.BaseURI + '/TargetSales/GetAllTargetSalesListsCount/'+Division+','+KeyWord);
}
}
