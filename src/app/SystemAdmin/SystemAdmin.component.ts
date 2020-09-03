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
    $(document).ready(function(){
      // user meu mobile button
      $('#kt_header_mobile_toggler').click(function(){
        $('body, #kt_header_menu_wrapper').addClass('kt-header-menu-wrapper--on');
        $('.overlayClose').addClass('on');
      });
      // user meu mobile close button & overlay close
      $('#kt_header_menu_mobile_close_btn, .kt-menu__item').click(function(){
        $('body, #kt_header_menu_wrapper').removeClass('kt-header-menu-wrapper--on');
        $('.overlayClose').removeClass('on');
      });
      // Aside meu mobile button
      $('#kt_aside_mobile_toggler').click(function(){
        $('body, #kt_aside').addClass('kt-aside--on');
        $('.overlayClose').addClass('on');
      });
      // Aside meu mobile close button
      $('#kt_aside_close_btn').click(function(){
        $('body, #kt_aside').removeClass('kt-aside--on');
        $('.overlayClose').removeClass('on');
      });
      // submenu click
      $('#kt_aside_menu_wrapper .kt-menu__nav .kt-menu__item--submenu').click(function(){
        $(this).toggleClass('kt-menu__item--open');
      });
      // overlay close
      $('.overlayClose').click(function(){
        $('body, #kt_header_menu_wrapper').removeClass('kt-header-menu-wrapper--on');
        $('body, #kt_aside').removeClass('kt-aside--on');
        $(this).removeClass('on');
      });
    });
  }

  onLogout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('IDbint');
    localStorage.removeItem('UserType');
    localStorage.removeItem('UserCode');
    this.router.navigate(['/user/login']);
  }
}