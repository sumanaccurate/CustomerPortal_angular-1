import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { HomenavComponent } from '../homenav/homenav.component';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Users: any[]; 
  constructor(private router: Router, private service: UserService,@Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  ngOnInit(): void {
    let Users;
    this.service.getUsersData().subscribe(  
      data => {  
       this.Users = data as any[];  
      }  
    );  

  }

  pass(value): void {
    // console.log('recieved= key:' + key + 'value:' + val);
    this.storage.set('Userid',value);
    this.router.navigateByUrl('/SuperAdmin/EditAdmin');
    console.log(this.storage.get('Userid'));
    // this.data[key]= this.storage.get(key);
   }

}
