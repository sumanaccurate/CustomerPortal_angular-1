import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomenavComponent } from './homenav/homenav.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
 
})
export class HomeComponent implements OnInit {
  userDetails; 
  constructor(private router: Router, private service: UserService) { }

  ngOnInit() {
    $(document).ready(function(){
      $('#kt_header_mobile_toggler').click(function(){
        $('body, #kt_header_menu_wrapper').addClass('kt-header-menu-wrapper--on');
      });
      $('#kt_header_menu_mobile_close_btn, .kt-menu__item').click(function(){
        $('body, #kt_header_menu_wrapper').removeClass('kt-header-menu-wrapper--on');
      });
    });
  }
}
