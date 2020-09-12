import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/component/alert.service';
import { CustomerService } from 'src/app/shared/CustomerService';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../register/register.component.css']
})
export class CustomerRegistrationComponent implements OnInit {

  constructor( @Inject(SESSION_STORAGE) private storage: WebStorageService, private router: Router,private _CustomerService:CustomerService,private alertService: AlertService) { }
  Customer
  Customers
  ngOnInit() {
    this._CustomerService.getCustomerData(this.storage.get('UserId')).subscribe(
      (res: any) => {
        this.Customers=res[0];
        this.Customer = new FormGroup({
          CustCodevtxt : new FormControl(res[0].CustCodevtxt, [Validators.required, Validators.maxLength(256)]),
          Contactpersonvtxt : new FormControl(res[0].Contactpersonvtxt, [Validators.required, Validators.maxLength(256)]),
          Gstnovtxt : new FormControl(res[0].Gstnovtxt, [Validators.required, Validators.maxLength(256)]),
          PanNovtxt : new FormControl(res[0].PanNovtxt, [Validators.required, Validators.maxLength(256)]),
          SalesOfficevtxt : new FormControl(res[0].SalesOfficevtxt, [Validators.required, Validators.maxLength(256)]),
          CustGrp1vtxt : new FormControl(res[0].CustGrp1vtxt, [Validators.required, Validators.maxLength(256)]),
          CustNamevtxt : new FormControl(res[0].CustNamevtxt, [Validators.required, Validators.maxLength(256)]),
          TelNumber1vtxt : new FormControl(res[0].TelNumber1vtxt, [Validators.required, Validators.maxLength(256)]),
          Emailvtxt : new FormControl(res[0].Emailvtxt, [Validators.required, Validators.maxLength(256)]),
          Address1vtxt : new FormControl(res[0].Address1vtxt, [Validators.required, Validators.maxLength(256)]),
          Password : new FormControl('', [Validators.required, Validators.maxLength(256)]),
          ConfirmPassword : new FormControl('', [Validators.required, Validators.maxLength(256)]),
        })
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
  getControlLabel(type: string){
    return this.Customer.controls[type].value;
   }
  Submit(){

    const passwordControl = this.Customer.controls['Password'].value;
    const confirmPasswordControl = this.Customer.controls['ConfirmPassword'].value;
    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }
    if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
      return null;
    }
    if (passwordControl !== confirmPasswordControl) {
      this.alertService.error('passwordMismatch :(', 'passwordMismatch');
      return null;
    } 
    this.Customers = {
    CustCodevtxt:this.Customers.CustCodevtxt,
    CustNamevtxt:this.Customers.CustNamevtxt,
    TelNumber1vtxt:this.Customers.TelNumber1vtxt,
    Emailvtxt:this.Customers.Emailvtxt,
    Address1vtxt:this.Customers.Address1vtxt,
    Contactpersonvtxt:this.Customers.Address1vtxt,
    Password:passwordControl,
    }

    this.Customers.Password=passwordControl;
    this._CustomerService.Update(this.Customers).subscribe(
      (res: any) => {
        this.router.navigateByUrl('/user/login');
        this.alertService.error('Password set .');
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
