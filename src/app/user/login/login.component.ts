import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
 import { AlertService } from '../../component/alert.service';
import { AuthService } from 'src/app/services/auth.service';

 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  loginForm = new FormGroup({
    UserCodetxt : new FormControl(''),
    Passwordvtxt : new FormControl(''),
  })

  constructor( private router: Router,private authService :AuthService
     , private alertService : AlertService ) { }

  ngOnInit() {
    $('body, #kt_header_menu_wrapper').removeClass('kt-header-menu-wrapper--on');

    if (localStorage.getItem('id_token') != null) {
      this.router.navigateByUrl('/SuperAdmin/dashboard');
    }
  }


  onSubmit(): void {
      this.authService.login(this.loginForm.value).subscribe(() => {
         let UserTypetxt=  localStorage.getItem('UserType');
         if(UserTypetxt=="SuperAdmin"){
          this.router.navigateByUrl('/SuperAdmin/dashboard');
        }else if (UserTypetxt=="SystemAdmin"){
          this.router.navigateByUrl('/SystemAdmin/CustomerDetail');
        }else if (UserTypetxt=="Customer"){
          this.router.navigateByUrl('/Customer/dashboard');
        }else if (UserTypetxt=="SystemAdmin"){
          this.router.navigateByUrl('/SystemAdmin/CustomerDetail');
        }
      }, err => {
        let errorMessage = err && err.error;
      this.alertService.error(errorMessage);
      });
    
  }
 
}
