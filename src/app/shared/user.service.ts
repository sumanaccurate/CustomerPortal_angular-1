import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
   }
  readonly BaseURI = 'https://localhost:44354';

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURI + '/User/Register', body);
  }

  login(formData) {
    return this.http.post(this.BaseURI + '/UserMaster/Login', formData);
  }

  addUser(formData) {
    return this.http.post(this.BaseURI + '/UserMaster/Create', formData);
  }

  updateUser(formData) {
    return this.http.put(this.BaseURI + '/UserMaster/Update', formData);
  }


  getUserData(ID) {
    return this.http.get(this.BaseURI + '/UserMaster/GetUserDetails?ID='+ID);
  }
  
  getUsersData() {
    return this.http.get(this.BaseURI + '/UserMaster/GetUsersDetails');
  }

  getUserProfile(ID) {
    return this.http.get(this.BaseURI + '/UserMaster/GetUserDetails?ID='+ID);
  }
}
