import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';

import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
import { JWTTokenService } from '../../auth/jwt';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class SuperAdminDashboardComponent implements OnInit {
  Users: any[]; 
  constructor(private router: Router, private service: UserService,
    @Inject(SESSION_STORAGE) private storage: WebStorageService
    ,private jwtservice : JWTTokenService) { }
  ngOnInit(): void {
    let Users;
    // console.log(this.jwtservice.decodeToken());
    this.service.getUsersData().subscribe(  
      data => {  
       this.Users = data as any[];  
      }  
    );  
    console.log(this.jwtservice.getToken());
  }

  pass(value): void {
    // console.log('recieved= key:' + key + 'value:' + val);
    this.storage.set('Userid',value);
    this.router.navigateByUrl('/SuperAdmin/EditAdmin');
    console.log(this.storage.get('Userid'));
    // this.data[key]= this.storage.get(key);
   }

}
