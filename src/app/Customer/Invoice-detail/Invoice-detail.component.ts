import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { PaginationService } from '../../component/pagination/pagination.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import * as fileSaver from 'file-saver';
import { CustomerFloatDataComponent } from '../customer-float-data/customer-float-data.component';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { InvoiceService } from 'src/app/shared/InvoiceService';
@Component({
  selector: 'app-COrder-detail',
  templateUrl: './Invoice-detail.component.html',
  styleUrls: ['./Invoice-detail.component.css']
})
export class CustomerInvoiceDetailComponent implements OnInit {
  Invoices: any[];
  constructor(private _InvoiceService: InvoiceService, private router: Router
    , public paginationService: PaginationService, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  userData;
  pageNo: any = 1;
  search = null;
  FromDate = null;
  Status='All';
  Todate = null;
  pageNumber: boolean[] = [];
  sortInvoice: any = 'CompanyName_ASC';
  Invoice: any = 'CompanyName';
  //Pagination Variables  
  //Page Row variables  

  pageField = [];
  exactPageList: any;
  paginationData: number;
  InvoicesPerPage: any = 10;
  InvoiceBy: string = 'Asc';

  totalInvoices: any;
  totalInvoicesCount: any;
  currentPage = 1;

  ngOnInit() {
    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
    this.getAllInvoices();
  }

  getAllInvoices() {
    this._InvoiceService.getAllInvoiceData(this.FromDate,this.Todate,this.Status,localStorage.getItem('UserCode'), this.pageNo, this.InvoicesPerPage, this.search).subscribe((data: any) => {
      this.Invoices = data as any[];
      this.getAllInvoicesCount();
    })

  }
  getAllInvoicesCount() {
    this._InvoiceService.getAllInvoiceCount(this.FromDate,this.Todate,this.Status,localStorage.getItem('UserCode'), this.search).subscribe((res: any) => {
      this.totalInvoicesCount = res;
      this.totalNoOfPages();
    })
  }

  //Method For Pagination  
  totalNoOfPages() {

    this.paginationData = Number(this.totalInvoicesCount / this.InvoicesPerPage);
    let tempPageData = this.paginationData.toFixed();
    if (Number(tempPageData) < this.paginationData) {
      this.exactPageList = Number(tempPageData) + 1;
      this.paginationService.exactPageList = this.exactPageList;
    } else {
      this.exactPageList = Number(tempPageData);
      this.paginationService.exactPageList = this.exactPageList
    }
    this.paginationService.pageOnLoad();
    if(this.totalInvoicesCount > this.InvoicesPerPage){
      this.pageField = this.paginationService.pageField;
    }
    else{
      this.pageField = [1];
    }
   

  }
  showInvoicesByPageNumber(page, i) {
    this.Invoices = [];
    this.pageNumber = [];
    this.pageNumber[i] = true;
    this.pageNo = page;
    this.currentPage = page;
    this.getAllInvoices();
  }

  //Pagination Start  

  showPrevInvoices() {

    if (this.paginationService.showNoOfCurrentPage != 1) {
      this.paginationService.prevPage();
      this.pageNumber = [];
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllInvoices();
    }

  }

  showNextInvoices() {

    if (this.paginationService.disabledNextBtn == false) {
      this.pageNumber = [];
      this.paginationService.nextPage();
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllInvoices();
    }
  }
  sortByHeading(value: string, id) {
    this.Invoices = [];
    this.sortInvoice = value;
    this.Invoice = value;
    if (this.InvoiceBy == "Desc") {
      this.InvoiceBy = "Asc"
      this.sortInvoice = this.sortInvoice + '_ASC';
    } else {
      this.InvoiceBy = "Desc";
      this.sortInvoice = this.sortInvoice + '_DESC'
    }
    this.getAllInvoices();
  }
  pass(value): void {
    this.storage.set('InvoiceId', value);
    this.router.navigateByUrl('/Customer/InvoiceDetailView');
  }

  download() {
    this._InvoiceService.downloadFile(this.FromDate,this.Todate,this.Status,localStorage.getItem('UserCode'), this.search).subscribe(response => {
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
			//window.open(url);
			//window.location.href = response.url;
			fileSaver.saveAs(blob, 'Excel.xlsx');
		}), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
  }

  
  ChangeStatus(Value) {
    if (Value !== null && Value !== "") {
     this.Status=Value;
    }
  }

}   
