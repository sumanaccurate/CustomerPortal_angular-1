import { UserService } from '@app/shared/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl ,Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
 import { AlertService } from '@app/component/alert.service';
import { HomenavComponent } from '../homenav/homenav.component';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userAdd = new FormGroup({
    UserCodetxt : new FormControl('', [Validators.required, Validators.maxLength(256)]),
    UserNametxt : new FormControl('', [Validators.required, Validators.maxLength(256)]),
    UserTypetxt : new FormControl('SystemAdmin', [Validators.required, Validators.maxLength(256)]),
    Divisionvtxt : new FormControl('', [Validators.required, Validators.maxLength(256)]),
    Mobilevtxt : new FormControl('', [Validators.required, Validators.maxLength(256)]),
    Emailvtxt : new FormControl('', [Validators.required, Validators.maxLength(256)]),
    Passwordvtxt : new FormControl('', [Validators.required, Validators.maxLength(256)]),
    CPasswordvtxt : new FormControl('', [Validators.required, Validators.maxLength(256)]),

  })
  
  constructor(private service: UserService, private router: Router , private alertService : AlertService) { }

  ngOnInit(): void {
  }

  onSubmit() {

    const passwordControl = this.userAdd.controls['Passwordvtxt'].value;
    const confirmPasswordControl = this.userAdd.controls['CPasswordvtxt'].value;
    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }
    if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
      return null;
    }
    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      this.alertService.error('passwordMismatch :(', 'passwordMismatch');
      return null;
    }

    this.service.addUser(this.userAdd.value).subscribe(
      (res: any) => {
        if(res==201){
          this.alertService.error('User Added Succesfully.', 'Authentication failed.');
         this.router.navigateByUrl('/SuperAdmin/dashboard');
        }
        else
        console.log(res);
      },  
      err => {
         if (err.status == 400)
           this.alertService.error('Error.', 'Authentication failed.');
         else
          console.log(err);
      }
    );
  }

}
