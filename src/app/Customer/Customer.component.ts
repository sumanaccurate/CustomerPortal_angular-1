import { UserService } from '../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-SA',
  styleUrls: ['../app.component.css'],
  templateUrl: './Customer.component.html'
 
})
export class CustomerComponent implements OnInit{
  constructor( private authService :AuthService) { }
  
  ngOnInit() {
  }
  
  onLogout() {
    this.authService.logout();
  }
}