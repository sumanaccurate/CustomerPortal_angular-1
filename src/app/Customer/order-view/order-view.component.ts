import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { WebStorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { OrderService } from 'src/app/shared/OrderService';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class CustomerOrderViewComponent implements OnInit {

  constructor(private _OrderService :OrderService, private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  Orders: any[];
  OrderInfo ;
  ngOnInit() {
    let OrderNo =this.storage.get('OrderId');
    this.getAllOrderDataByOrderNo(OrderNo);
    this.GetOrderHeaderByOrderID(OrderNo);  
  }

  getAllOrderDataByOrderNo(OrderNo){
    this._OrderService.GetOrderDetailsByOrderID(OrderNo).subscribe((data: any) => {
      this.Orders = data as any[];
    });
  }

  GetOrderHeaderByOrderID(OrderNo){
    this._OrderService.GetOrderHeaderByOrderID(OrderNo).subscribe(  
      data => {  
       this.OrderInfo = data[0] ;  
      }  
    );  
  }

  Back(){
    this.storage.remove('OrderId');
    this.router.navigateByUrl('/Customer/OrderList');
  }
}
