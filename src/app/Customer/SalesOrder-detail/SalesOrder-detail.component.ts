import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { PaginationService } from '../../component/pagination/pagination.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CustomerService } from 'src/app/shared/CustomerService';
import * as fileSaver from 'file-saver';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { SalesOrderService } from 'src/app/shared/SalesOrderService';
import { CustomerFloatDataComponent } from '../customer-float-data/customer-float-data.component';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-COrder-detail',
  templateUrl: './SalesOrder-detail.component.html',
  styleUrls: ['./SalesOrder-detail.component.css']
})
export class CustomerSalesOrderDetailComponent implements OnInit {
  Orders: any[];
  constructor( public datepipe: DatePipe,private router: Router, private _SalesService: SalesOrderService,
    public paginationService: PaginationService, @Inject(SESSION_STORAGE) private storage: WebStorageService) {
      this.FromDate = new Date();
      this.FromDate.setDate(this.FromDate.getDate() - 10);
      this.FromDate = this.datepipe.transform(this.FromDate, 'dd-MM-yyyy');
      this.Todate = new Date();
      this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy'); }
  userData;
  pageNo: any = 1;
  search = null;
  status = 'All';
  FromDate = null;
  Todate = null;
  CompletedCount;
  PendingCount;
  partiallyCompletedCount;
  pageNumber: boolean[] = [];
  sortOrder: any = 'CompanyName_ASC';
  order: any = 'CompanyName';
  //Pagination Variables  
  //Page Row variables  

  pageField = [];
  exactPageList: any;
  paginationData: number;
  OrdersPerPage: any = 10;
  orderBy: string = 'Asc';

  totalOrders: any;
  totalOrdersCount: any;
  currentPage = 1;

    
  getPending() {
    this._SalesService.getAllSalesOrderCount(this.FromDate,this.Todate,'Pending',localStorage.getItem('UserCode'), this.search).subscribe((res: any) => {
      this.PendingCount = res;
      if(res=="" || res==null ){
        this.PendingCount = 0;
      }
    })
  } 
  getCompleted() {
    this._SalesService.getAllSalesOrderCount(this.FromDate,this.Todate,'Completely processed',localStorage.getItem('UserCode'), this.search).subscribe((res: any) => {
      this.CompletedCount = res;
      if(res=="" || res==null ){
        this.CompletedCount  = 0;
      }
    })
  }

  getPartiallyCompleted() {
    this._SalesService.getAllSalesOrderCount(this.FromDate,this.Todate,'Partially processed',localStorage.getItem('UserCode'), this.search).subscribe((res: any) => {
      this.partiallyCompletedCount = res;
      if(res=="" || res==null ){
        this.partiallyCompletedCount  = 0;
      }
    })
  }

  ngOnInit() {
    this.getAllOrders();
    this.getPending();
    this.getCompleted()
    this.getPartiallyCompleted();
  }

  getAllOrders() {
    this._SalesService.getAllSalesOrderData(this.FromDate,this.Todate,this.status,localStorage.getItem('UserCode'), this.pageNo, this.OrdersPerPage, this.search).subscribe((data: any) => {
      this.Orders = data as any[];
      this.getAllOrdersCount();
    })

  }
  getAllOrdersCount() {
    this._SalesService.getAllSalesOrderCount(this.FromDate,this.Todate,this.status,localStorage.getItem('UserCode'), this.search).subscribe((res: any) => {
      this.totalOrdersCount = res;
      this.totalNoOfPages();
    })
  }

  //Method For Pagination  
  totalNoOfPages() {

    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
    this.paginationData = Number(this.totalOrdersCount / this.OrdersPerPage);
    let tempPageData = this.paginationData.toFixed();
    if (Number(tempPageData) < this.paginationData) {
      this.exactPageList = Number(tempPageData) + 1;
      this.paginationService.exactPageList = this.exactPageList;
    } else {
      this.exactPageList = Number(tempPageData);
      this.paginationService.exactPageList = this.exactPageList
    }
    this.paginationService.pageOnLoad();
    if(this.totalOrdersCount > this.OrdersPerPage){
      this.pageField = this.paginationService.pageField;
    }
    else{
      this.pageField = [1];
    }
   
  }
  showOrdersByPageNumber(page, i) {
    this.Orders = [];
    this.pageNumber = [];
    this.pageNumber[i] = true;
    this.pageNo = page;
    this.currentPage = page;
    this.getAllOrders();
  }

  //Pagination Start  

  showPrevOrders() {

    if (this.paginationService.showNoOfCurrentPage != 1) {
      this.paginationService.prevPage();
      this.pageNumber = [];
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllOrders();
    }

  }

  showNextOrders() {

    if (this.paginationService.disabledNextBtn == false) {
      this.pageNumber = [];
      this.paginationService.nextPage();
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllOrders();
    }
  }
  sortByHeading(value: string, id) {
    this.Orders = [];
    this.sortOrder = value;
    this.order = value;
    if (this.orderBy == "Desc") {
      this.orderBy = "Asc"
      this.sortOrder = this.sortOrder + '_ASC';
    } else {
      this.orderBy = "Desc";
      this.sortOrder = this.sortOrder + '_DESC'
    }
    this.getAllOrders();
  }


  pass(value): void {
    this.storage.set('OrderId', value);
    this.router.navigateByUrl('/Customer/SalesOrderDetailView');
  }

  ChangeStatus(Value) {
    if (Value !== null && Value !== "") {
     this.status=Value;
    }
  }
 download() {
    this._SalesService.downloadFile(this.FromDate,this.Todate,this.status,localStorage.getItem('UserCode'), this.search).subscribe(response => {
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
			//window.open(url);
			//window.location.href = response.url;
			fileSaver.saveAs(blob, 'Excel.xlsx');
		}), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
  }
}   
