import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';    
import { PaginationService } from '../../component/pagination/pagination.service';
import { FormGroup, FormControl ,Validators, AbstractControl } from '@angular/forms';
import { CustomerService } from 'src/app/shared/CustomerService';
import { SalesOrderService } from 'src/app/shared/SalesOrderService';
import { DeliveryOrderService } from 'src/app/shared/DeliveryOrderService';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {

  constructor(private router: Router, private _CustomerService: CustomerService
    , public paginationService: PaginationService ,private _SalesService :SalesOrderService,
    private _DeliveryOrderService :DeliveryOrderService ) { }
TotalOrders;
OutStanding;
CreditLimit;
RetailOrder;
  ngOnInit(): void {
    this.getAllCreditLimitforDashboard();
    this.getAllOrdersCountforDashboard();
    this.getAllOutStandingforDashboard();
    this.getAllSalesOrderforDashboard();
  }
  getAllOrdersCountforDashboard() {  
    this._DeliveryOrderService.getAllOrdersCountforDashboard(localStorage.getItem('UserCode')).subscribe((res: any) => {  
      this.TotalOrders = res;  
    })  
  }  
  getAllOutStandingforDashboard() {  
    this._CustomerService.getAllOutStandingforDashboard(localStorage.getItem('UserCode')).subscribe((res: any) => {  
      this.OutStanding = res;  
    })  
  }  
  getAllCreditLimitforDashboard() {  
    this._CustomerService.getAllCreditLimitforDashboard(localStorage.getItem('UserCode')).subscribe((res: any) => {  
      this.CreditLimit = res;  
    })  
  }  
  getAllSalesOrderforDashboard() {  
    this._SalesService.getAllSalesOrderforDashboard(localStorage.getItem('UserCode')).subscribe((res: any) => {  
      this.RetailOrder = res;  
    })  
  }  
}
