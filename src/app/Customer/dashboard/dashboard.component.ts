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
import { Chart } from 'chart.js';  
import {Targetsalesdata} from 'src/app/models/Targetsalesdata';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  data: Targetsalesdata[];  
  Month = [];  
  TotalActualSales = [];  
  TotalTargetSales = [];  
  Linechart = [];  
  constructor(public datepipe: DatePipe,private _TargetSales:TargetSales, private router: Router, private _CustomerService: CustomerService
    , public paginationService: PaginationService ,private _SalesService :SalesOrderService,
    private _DeliveryOrderService :DeliveryOrderService ) {
     }
TotalOrders;
ActualSales=0;
Achivement=0;
TargetSales=0;
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
    this.getbarchart();
  }
  
  getbarchart()
  {
    this.Todate  = new Date();
    this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy');
    this._TargetSales.getTargetSalesforDashboardBarChart(localStorage.getItem('UserCode'),this.Todate).subscribe((result: Targetsalesdata[]) => {  
      result.forEach(x => {  
        this.Month.push(x.Month);  
        this.TotalTargetSales.push(x.TotalTargetSales);  
        this.TotalActualSales.push(x.TotalActualSales); 
      });  
      var ytargetData = {
        label: 'Target Sales Data',
        data: this.TotalTargetSales,
        backgroundColor: 'rgba(0, 99, 132, 0.6)',
        borderColor: 'rgba(0, 99, 132, 1)',
        yAxisID: "y-axis-Target"
      };
      var yActualData = {
        label: 'Actual Sales Data',
        data: this.TotalActualSales,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        yAxisID: "y-axis-Sales"
      };
      var xMonthData = {
        labels: this.Month,
        datasets: [ytargetData, yActualData]
      };
      var chartOptions = {
        scales: {
          xAxes: [{
            display: true,
          }],
          yAxes: [{
            id: "y-axis-Target"
          }, {
            id: "y-axis-Sales"
          }]
        }
      };
      this.Linechart = new Chart('canvas', {  
        type: 'bar',  
        data: xMonthData,
        options: chartOptions  
      });  
    });  
  }

  getTargetSalesforDashboard() {  
    this.Todate  = new Date();
    this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy');
    this._TargetSales.getTargetSalesforDashboard(localStorage.getItem('UserCode'),this.Todate).subscribe((res: any) => {  
      this.TargetSales = res;  
      if(res!=null&& res !=''){
        this.Achivement=res['0'].Achivement.toFixed(2);
        this.TargetSales=res['0'].TargetSales.toFixed(2);
        this.ActualSales=res['0'].ActualSales.toFixed(2);
        if( this.ActualSales==0.00){
          this.ActualSales=0;
        }
        if( this.TargetSales==0.00){
          this.TargetSales=0;
        }
        if( this.Achivement==0.00){
          this.Achivement=0;
        }
        // if(res['0'].Achivement>0){
        //   this.Achivement=res['0'].Achivement.toFixed(2);
        // }else{
        //   this.Achivement=0;
        // }
        // if(res['0'].TargetSales>0){
        //   this.TargetSales=res['0'].TargetSales.toFixed(2);
        // }else{
        //   this.Achivement=0;
        // }
        // if(res['0'].ActualSales>0){
        // this.ActualSales=res['0'].ActualSales.toFixed(2);
        // }else{
        //   this.Achivement=0;
        // }
      }

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
