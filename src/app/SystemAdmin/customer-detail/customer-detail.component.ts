import { Component, OnInit } from '@angular/core';
import { SystemAdminService } from '../../shared/SystemAdminService';
import { Router } from '@angular/router';
import { PaginationService } from '../../component/pagination/pagination.service';
@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  Customers: any[]; 
  constructor(private router: Router, private _SystemAdminService: SystemAdminService
    , public paginationService: PaginationService) { }

  pageNo: any = 1;  
  pageNumber: boolean[] = [];  
  sortOrder: any = 'CompanyName_ASC';  
  order:any='CompanyName';  
  //Pagination Variables  
  //Page Row variables  
  smallPageRow: boolean = true;  
  mediumPageRow: boolean = false;  
  largePageRow: boolean = false;  
  
  small = 10;  
  medium = 10;  
  large =10;  
  
  pageField = [];  
  exactPageList: any;  
  paginationData: number;  
  CustomersPerPage: any = 10;  
  orderBy: string='Asc';  
  
  totalCustomers: any;  
  totalCustomersCount: any;  
  currentPage = 1;  
  
  ngOnInit() {  
    this.pageNumber[0] = true;  
    this.paginationService.temppage = 0;  
    this.getAllCustomers();  
  }  
  getAllCustomers() {  
       this._SystemAdminService.getAllCustomer(localStorage.getItem('Division'),this.pageNo, this.CustomersPerPage,'').subscribe((data: any) => {
      this.Customers = data as any[];
      this.getAllCustomersCount();
    })
    
  }  
  getAllCustomersCount() {  
    this._SystemAdminService.getAllCustomerCount(localStorage.getItem('Division')).subscribe((res: any) => {  
      this.totalCustomersCount = res;  
      this.totalNoOfPages();  
    })  
  }  
  
  //Method For Pagination  
  totalNoOfPages() {  
  
    this.paginationData = Number(this.totalCustomersCount / this.CustomersPerPage);  
    let tempPageData = this.paginationData.toFixed();  
    if (Number(tempPageData) < this.paginationData) {  
      this.exactPageList = Number(tempPageData) + 1;  
      this.paginationService.exactPageList = this.exactPageList;  
    } else {  
      this.exactPageList = Number(tempPageData);  
      this.paginationService.exactPageList = this.exactPageList  
    }  
    this.paginationService.pageOnLoad();  
    this.pageField = this.paginationService.pageField;  
  
  }  
  showCustomersByPageNumber(page, i) {  
    this.Customers = [];  
    this.pageNumber = [];  
    this.pageNumber[i] = true;  
    this.pageNo = page;  
    this.currentPage =page;  
    this.getAllCustomers();  
  }  
  
  //Pagination Start  
  
  showPrevCustomers() {  
  
    if (this.paginationService.showNoOfCurrentPage != 1) {  
      this.paginationService.prevPage();  
      this.pageNumber = [];  
      this.pageNumber[0] = true;  
      this.currentPage = this.paginationService.pageField[0];  
      this.getAllCustomers();  
    }  
  
  }  
  
  showNextCustomers() {  
  
    if (this.paginationService.disabledNextBtn == false) {  
      this.pageNumber = [];  
      this.paginationService.nextPage();  
      this.pageNumber[0] = true;  
      this.currentPage = this.paginationService.pageField[0];  
      this.getAllCustomers();  
    }  
  }  
  sortByHeading(value: string, id) {  
    this.Customers = [];  
    this.sortOrder = value;  
    this.order =value;  
    if (this.orderBy == "Desc") {  
      this.orderBy = "Asc"  
      this.sortOrder =this.sortOrder+'_ASC';  
    } else {  
      this.orderBy = "Desc";  
      this.sortOrder =this.sortOrder+'_DESC'  
    }  
    this.getAllCustomers();  
  }  
  
}   
