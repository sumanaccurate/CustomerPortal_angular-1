import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';    
import { PaginationService } from '../../component/pagination/pagination.service';
import { FormGroup, FormControl ,Validators, AbstractControl } from '@angular/forms';
import { CustomerService } from 'src/app/shared/CustomerService';
import { SalesOrderService } from 'src/app/shared/SalesOrderService';
import { DeliveryOrderService } from 'src/app/shared/DeliveryOrderService';
import { CustomerFloatDataComponent } from '../customer-float-data/customer-float-data.component';
import { TargetSales } from 'src/app/shared/TargetSales';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {

  constructor(public datepipe: DatePipe,private _TargetSales:TargetSales, private router: Router, private _CustomerService: CustomerService
    , public paginationService: PaginationService ,private _SalesService :SalesOrderService,
    private _DeliveryOrderService :DeliveryOrderService ) { }
TotalOrders;

TargetSales;
OutStanding;
CreditLimit;
Todate
RetailOrder;
  ngOnInit(): void {
    this.getAllCreditLimitforDashboard();
    this.getAllOutStandingforDashboard();
    this.getAllOrdersCountforDashboard();
    this.getAllSalesOrderforDashboard();
    this.getTargetSalesforDashboard();
  }
  getTargetSalesforDashboard() {  
    this.Todate  = new Date();
    this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy');
    this._TargetSales.getTargetSalesforDashboard(localStorage.getItem('UserCode'),this.Todate).subscribe((res: any) => {  
      this.TargetSales = res;  
    }) 
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
