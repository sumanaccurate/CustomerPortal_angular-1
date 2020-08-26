import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onLogout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('IDbint');
    localStorage.removeItem('UserType');
    localStorage.removeItem('UserCode');
    this.router.navigate(['/user/login']);
  }

}
