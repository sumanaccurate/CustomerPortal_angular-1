import { Component, OnInit } from '@angular/core';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
import { FormGroup, FormControl ,Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/shared/CustomerService';
import { DatePipe } from '@angular/common';
import { parse } from 'querystring';
@Component({
  selector: 'app-customer-float-data',
  templateUrl: './customer-float-data.component.html',
  styleUrls: ['./customer-float-data.component.css'],
  providers: [DatePipe]
})
export class CustomerFloatDataComponent implements OnInit {
  myDate = new Date();
  datestring;
  constructor(private service: CustomerService, private router: Router,private datePipe: DatePipe,
     @Inject(SESSION_STORAGE) private storage: WebStorageService) {
      this.datestring =this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
      }
  CustomerData: any; 
  ngOnInit(): void {
    let Userid= localStorage.getItem('UserCode');
    this.getUserData(Userid);
  }

  getUserData(Userid){
    if(Userid!==null &&Userid!==""){
      
      this.service.getCustomerData(Userid).subscribe(  
        data => {  
         this.CustomerData = data['0'] ;  
        }  
      );  
    }
    else{
      this.router.navigate(['/user/login']);
    }
  }
}
