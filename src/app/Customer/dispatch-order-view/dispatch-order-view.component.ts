import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { WebStorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { CustomerService } from 'src/app/shared/CustomerService';

@Component({
  selector: 'app-dispatch-order-view',
  templateUrl: './dispatch-order-view.component.html',
  styleUrls: ['./dispatch-order-view.component.css']
})
export class DispatchOrderViewComponent implements OnInit {

  constructor(private _CustomerService: CustomerService, private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  Orders: any[];
  OrderInfo ;
  ngOnInit() {
    let OrderNo =this.storage.get('OrderId');
    this.getAllOrderDataByOrderNo(OrderNo);
    this.getDeliveryOrderHeaderDataByOrderNo(OrderNo);  
  }

  getAllOrderDataByOrderNo(OrderNo){
    this._CustomerService.getAllOrderDataByOrderNo(OrderNo).subscribe((data: any) => {
      this.Orders = data as any[];
    });
  }

  getDeliveryOrderHeaderDataByOrderNo(OrderNo){
    this._CustomerService.getDeliveryOrderHeaderDataByOrderNo(OrderNo).subscribe(  
      data => {  
       this.OrderInfo = data[0] ;  
      }  
    );  
  }

  Back(){
    this.storage.remove('OrderId');
    
    this.router.navigateByUrl('/Customer/DispatchOrderDetail');
  }
}
