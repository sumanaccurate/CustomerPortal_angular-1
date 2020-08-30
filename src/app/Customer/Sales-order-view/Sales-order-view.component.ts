import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { WebStorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { CustomerService } from 'src/app/shared/CustomerService';

@Component({
  selector: 'app-Sales-order-view',
  templateUrl: './Sales-order-view.component.html',
  styleUrls: ['./Sales-order-view.component.css']
})
export class CustomerSalesOrderViewComponent implements OnInit {

  constructor(private _CustomerService: CustomerService, private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  Orders: any[];
  DeliveryOrders: any[];
  OrderInfo: any;
  ngOnInit() {
    let OrderNo =this.storage.get('OrderId');
    this.getAllSalesOrderDataByOrderNo(OrderNo);
    this.getSalesOrderHeaderDataByOrderNo(OrderNo);
    this.getAllDeliveryOrderDataBySalesOrderNo(OrderNo);
  }

  getAllDeliveryOrderDataBySalesOrderNo(OrderNo){
    this._CustomerService.getAllDeliveryOrderDataBySalesOrderNo(OrderNo).subscribe((data: any) => {
      this.DeliveryOrders = data as any[];
    });
  }

  getAllSalesOrderDataByOrderNo(OrderNo){
    this._CustomerService.getAllSalesOrderDataByOrderNo(OrderNo).subscribe((data: any) => {
      this.Orders = data as any[];
    });
  }

  getSalesOrderHeaderDataByOrderNo(OrderNo){
    this._CustomerService.getSalesOrderHeaderDataByOrderNo(OrderNo).subscribe(  
      data => {  
       this.OrderInfo = data[0] ;  
      }  
    );  
  }


  Back(){
    this.storage.remove('OrderId');
    this.router.navigateByUrl('/Customer/SalesOrderDetail');
  }

}
