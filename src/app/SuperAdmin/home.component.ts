import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomenavComponent } from './homenav/homenav.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
 
})
export class HomeComponent implements OnInit {
  userDetails; 
  constructor(private router: Router, private service: UserService) { }

  ngOnInit() {
   
    // this.service.getUserProfile().subscribe(
    //   res => {
    //     this.userDetails = res;
    //   },
    //   err => {
    //     console.log(err);
    //   },
    // );
  }
}