import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { WebStorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { CustomerService } from 'src/app/shared/CustomerService';

@Component({
  selector: 'app-Invoice-view',
  templateUrl: './Invoice-view.component.html',
  styleUrls: ['./Invoice-view.component.css']
})
export class CustomerInvoiceViewComponent implements OnInit {

  constructor(private _CustomerService: CustomerService, private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  Invoices: any[];
  InvoiceInfo: any;
  ngOnInit() {
    let InvoiceNo =this.storage.get('InvoiceId');
    this.getAllInvoiceDataByInvoiceNo(InvoiceNo);
    this.getInvoiceHeaderDataByInvoiceNo(InvoiceNo);  
  }

  getAllInvoiceDataByInvoiceNo(InvoiceNo){
    this._CustomerService.getAllInvoiceDataByInvoiceNo(InvoiceNo).subscribe((data: any) => {
      this.Invoices = data as any[];
      this.InvoiceInfo=this.Invoices[0];
    });
  }

  getInvoiceHeaderDataByInvoiceNo(InvoiceNo){
    this._CustomerService.getInvoiceHeaderDataByInvoiceNo(InvoiceNo).subscribe(  
      data => {  
       this.InvoiceInfo = data[0] ;  
      }  
    );  
  }
  
  Back(){
    this.storage.remove('InvoiceId');
    this.router.navigateByUrl('/Customer/InvoiceDetail');
  }

}
