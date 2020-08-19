import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';

import { HomenavComponent } from '../homenav/homenav.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Users: any[]; 
 
  constructor(private router: Router, private service: UserService) { }

  ngOnInit(): void {
    let Users;
    this.service.getUserData().subscribe(  
      data => {  
       this.Users = data as any[];  
      }  
    );  

  }

}
