import { UserService } from '../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-SA',
  styleUrls: ['../app.component.css'],
  templateUrl: './SystemAdmin.component.html'
 
})
export class SystemAdminComponent implements OnInit {
  userDetails; 
  constructor(private router: Router, private service: UserService) { }
  
  ngOnInit() {
  }
  
  onLogout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('IDbint');
    localStorage.removeItem('UserType');
    localStorage.removeItem('UserCode');
    this.router.navigate(['/user/login']);
  }
}