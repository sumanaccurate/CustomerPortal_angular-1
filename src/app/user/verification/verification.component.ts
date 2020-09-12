import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl ,Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/component/alert.service';
import { CustomerService } from 'src/app/shared/CustomerService';
@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['../register/register.component.css']
})
export class CustomerVerificationComponent implements OnInit {

  constructor( @Inject(SESSION_STORAGE) private storage: WebStorageService, private router: Router,private _CustomerService:CustomerService,private alertService: AlertService) { }
  Customer
  ngOnInit() {
    this.Customer = new FormGroup({
      CustomerCode : new FormControl('', [Validators.required, Validators.maxLength(256)]),
      AccessToken : new FormControl('', [Validators.required, Validators.maxLength(256)]),
    })
  }

  Submit(){
    this._CustomerService.Verify( this.Customer.controls['CustomerCode'].value, this.Customer.controls['AccessToken'].value).subscribe(
      (res: any) => {
        if(res[0]==null ||res[0]=='' ){
          this.alertService.error('Invalid Entery');
          return null
        }else{

          this.storage.set('UserId',this.Customer.controls['CustomerCode'].value);
          this.router.navigateByUrl('/user/Registration');
        }
      },
      err => {
        if (err.status == 400)
          this.alertService.error('Error Occured.');
        else
          console.log(err);;
          return
      }
    );
  }

}
