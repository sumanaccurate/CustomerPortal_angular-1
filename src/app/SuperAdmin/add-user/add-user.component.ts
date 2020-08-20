import { UserService } from '@app/shared/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl ,Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
 import { AlertService } from '@app/component/alert.service';
import { HomenavComponent } from '../homenav/homenav.component';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userAdd = new FormGroup({
    Idint : new FormControl(''),
    UserCodetxt : new FormControl('', [Validators.required, Validators.maxLength(256)]),
    UserNametxt : new FormControl('', [Validators.required, Validators.maxLength(256)]),
    UserTypetxt : new FormControl('SystemAdmin', [Validators.required, Validators.maxLength(256)]),
    Divisionvtxt : new FormControl('', [Validators.required, Validators.maxLength(256)]),
    Mobilevtxt : new FormControl('', [Validators.required, Validators.maxLength(256)]),
    Emailvtxt : new FormControl('', [Validators.required, Validators.maxLength(256)]),
    Passwordvtxt : new FormControl('', [Validators.required, Validators.maxLength(256)]),
    CPasswordvtxt : new FormControl('', [Validators.required, Validators.maxLength(256)]),

  })
  Userid =null ;
  User: any; 
  constructor(private service: UserService, private router: Router
    ,@Inject(SESSION_STORAGE) private storage: WebStorageService
   , private alertService : AlertService) { }

  ngOnInit(): void {
    this.Userid= this.storage.get('Userid');
    if(this.Userid!==null && this.Userid!==""){
      this.storage.set('Userid',null);
      this.service.getUserData(this.Userid).subscribe(  
        data => {  
         this.User = data ;  
         this.userAdd = new FormGroup({
          Idint : new FormControl(this.Userid),
          UserCodetxt : new FormControl(this.User.UserCodetxt, [Validators.required, Validators.maxLength(256)]),
          UserNametxt : new FormControl(this.User.UserNametxt, [Validators.required, Validators.maxLength(256)]),
          UserTypetxt : new FormControl('SystemAdmin', [Validators.required, Validators.maxLength(256)]),
          Divisionvtxt : new FormControl(this.User.Divisionvtxt, [Validators.required, Validators.maxLength(256)]),
          Mobilevtxt : new FormControl(this.User.Mobilevtxt, [Validators.required, Validators.maxLength(256)]),
          Emailvtxt : new FormControl(this.User.Emailvtxt, [Validators.required, Validators.maxLength(256)]),
          Passwordvtxt : new FormControl(this.User.Passwordvtxt, [Validators.required, Validators.maxLength(256)]),
          CPasswordvtxt : new FormControl(this.User.Passwordvtxt, [Validators.required, Validators.maxLength(256)]),
      
        })
        }  
      );  

     
    }

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
    if (passwordControl !== confirmPasswordControl) {
      this.alertService.error('passwordMismatch :(', 'passwordMismatch');
      confirmPasswordControl.setErrors({ passwordMismatch: true });
      return null;
    } 

    if(this.Userid!==null || this.Userid!==''){
      this.service.updateUser(this.userAdd.value).subscribe(
        (res: any) => {
          if(res==201){
           this.router.navigateByUrl('/SuperAdmin/dashboard');
           this.alertService.success('User Updated Succesfully.');
          }
          else
          console.log(res);
        },  
        err => {
           if (err.status == 400)
             this.alertService.error('Error.');
           else
            console.log(err);
        }
      );
    }
    else{
      this.service.addUser(this.userAdd.value).subscribe(
        (res: any) => {
          if(res==201){
           this.router.navigateByUrl('/SuperAdmin/dashboard');
           this.alertService.success('User Added Succesfully.');
          }
          else
          console.log(res);
        },  
        err => {
           if (err.status == 400)
             this.alertService.error('Error.');
           else
            console.log(err);
        }
      );

    }

  
  }

}
