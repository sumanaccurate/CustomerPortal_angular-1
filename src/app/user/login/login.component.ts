import { UserService } from '../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
 import { AlertService } from '../../component/alert.service';

 
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

  constructor(private service: UserService, private router: Router
     , private alertService : AlertService ) { }

  ngOnInit() {
    if (localStorage.getItem('id_token') != null)
    {
      this.router.navigateByUrl('/SuperAdmin/dashboard');
    }
  }

  onSubmit() {
    this.service.login(this.loginForm.value).subscribe(
      (res: any) => {
       localStorage.setItem('id_token', res.BearerToken);
       localStorage.setItem('IDbint', res.IDbint);
       localStorage.setItem('UserType', res.UserTypetxt);
       localStorage.setItem('UserCode', res.UserCodetxt);
       localStorage.setItem('Division', res.Divisionvtxt);

        if(res.UserTypetxt=="SuperAdmin"){
          this.router.navigateByUrl('/SuperAdmin/dashboard');
        }else if (res.UserTypetxt=="SystemAdmin"){
          this.router.navigateByUrl('/SystemAdmin/CustomerDetail');
        }else if (res.UserTypetxt=="SystemAdmin"){
          this.router.navigateByUrl('/SystemAdmin/CustomerDetail');
        }else if (res.UserTypetxt=="SystemAdmin"){
          this.router.navigateByUrl('/SystemAdmin/CustomerDetail');
        }
      },  
      err => {
         if (err.status == 400)
           this.alertService.error('Incorrect username or password.', 'Authentication failed.');
         //  this.toastr.error('Incorrect username or password.', 'Authentication failed.');
         else
          console.log(err);
      }
    );
  }
}
