import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { WebStorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { SystemAdminService } from '../../shared/SystemAdminService';
import { PaginationService } from '../../component/pagination/pagination.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-target-sales-list',
  templateUrl: './target-sales-list.component.html',
  styleUrls: ['./target-sales-list.component.css']
})
export class SystemAdminTargetSalesListComponent implements OnInit {
  TargetSales: any[]; 
  constructor(private router: Router, private _SystemAdminService: SystemAdminService
    , public paginationService: PaginationService, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }

  pageNo: any = 1;  
  search = null;
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
    this.getAllTargetSales();  
  }  
  getAllTargetSales() {  
       this._SystemAdminService.GetAllTargetSalesExcelData(localStorage.getItem('Division'),this.pageNo, this.CustomersPerPage,this.search).subscribe((data: any) => {
      this.TargetSales = data as any[];
      this.getAllTargetSalescount();
    })
    
  }  
  getAllTargetSalescount() {  
    this._SystemAdminService.getTargetSalesExcelDataCount(localStorage.getItem('Division'),this.search).subscribe((res: any) => {  
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
    this.TargetSales = [];  
    this.pageNumber = [];  
    this.pageNumber[i] = true;  
    this.pageNo = page;  
    this.currentPage =page;  
    this.getAllTargetSales();  
  }  
  
  //Pagination Start  
  
  showPrevCustomers() {  
  
    if (this.paginationService.showNoOfCurrentPage != 1) {  
      this.paginationService.prevPage();  
      this.pageNumber = [];  
      this.pageNumber[0] = true;  
      this.currentPage = this.paginationService.pageField[0];  
      this.getAllTargetSales();  
    }  
  
  }  
  
  showNextCustomers() {  
  
    if (this.paginationService.disabledNextBtn == false) {  
      this.pageNumber = [];  
      this.paginationService.nextPage();  
      this.pageNumber[0] = true;  
      this.currentPage = this.paginationService.pageField[0];  
      this.getAllTargetSales();  
    }  
  }  
  sortByHeading(value: string, id) {  
    this.TargetSales = [];  
    this.sortOrder = value;  
    this.order =value;  
    if (this.orderBy == "Desc") {  
      this.orderBy = "Asc"  
      this.sortOrder =this.sortOrder+'_ASC';  
    } else {  
      this.orderBy = "Desc";  
      this.sortOrder =this.sortOrder+'_DESC'  
    }  
    this.getAllTargetSales();  
  }
  download() {
    this._SystemAdminService.DownloadTargetSalesExcelData(localStorage.getItem('Division'),this.search).subscribe(response => {
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
			//window.open(url);
			//window.location.href = response.url;
			fileSaver.saveAs(blob, 'TargetSales.xlsx');
		}), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
  }
 
}
