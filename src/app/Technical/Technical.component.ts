import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-https://www.codewithmukesh.com/blog/send-emails-with-aspnet-core/',
  templateUrl: './Technical.component.html'
 
})
export class TechnicalComponent implements OnInit {
  userDetails; 
  constructor(private router: Router, private service: UserService) { }

  ngOnInit() {
   
   
  }
}