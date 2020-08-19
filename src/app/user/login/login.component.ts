import { UserService } from '@app/shared/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

 import { AlertService } from '@app/component/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formModel={
    UserCodetxt : '',
    Passwordvtxt : '',
  }
  
  constructor(private service: UserService, private router: Router , private alertService : AlertService) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/SuperAdmin/dashboard');
  }

  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/SuperAdmin/dashboard');
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
