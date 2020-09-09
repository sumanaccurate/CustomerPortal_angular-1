import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/CustomerService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.css']
})
export class CustomerAccountStatementComponent implements OnInit {

  constructor(private router: Router, private _CustomerService: CustomerService) { }
  OutStanding;CreditLimit;AvailableCreditLimit;
  ngOnInit() {
    this.getAllCreditLimit();
    this.getAllOutStanding();
  }

  getAllOutStanding() {  
    this._CustomerService.getAllOutStandingforDashboard(localStorage.getItem('UserCode')).subscribe((res: any) => {  
      this.OutStanding = res;  
    })  
  }  
  
  getAllCreditLimit() {  
    this._CustomerService.getAllCreditLimitforDashboard(localStorage.getItem('UserCode')).subscribe((res: any) => {  
      this.CreditLimit = res;  
    })  
     this._CustomerService.getAllAvailableCreditLimitforDashboard(localStorage.getItem('UserCode')).subscribe((res: any) => {  
      this.AvailableCreditLimit = res;  
    })  
  }  
}
