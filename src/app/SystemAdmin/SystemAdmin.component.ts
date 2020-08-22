import { UserService } from '../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-SA',
  templateUrl: './SystemAdmin.component.html'
 
})
export class SystemAdminComponent implements OnInit {
  userDetails; 
  constructor(private router: Router, private service: UserService) { }

  ngOnInit() {
   
   
  }
}