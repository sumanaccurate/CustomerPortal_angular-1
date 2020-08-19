import { Component, OnInit } from '@angular/core';
import { SystemAdminService } from '../../shared/SystemAdminService';
import { Router } from '@angular/router';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  Customers: any[]; 
 
  constructor(private router: Router, private _SystemAdminService: SystemAdminService) { }


  ngOnInit(): void {
    let Users;
    this._SystemAdminService.GetCustomerData().subscribe(  
      data => {  
       this.Customers = data as any[];  
      }  
    );  

  }

}
