import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { CustomerService } from 'src/app/shared/CustomerService';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CustomerCreateOrderComponent implements OnInit {
  CustomerData: any; 
  constructor(private _CustomerService: CustomerService, private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
 
  projects={projectID: 'wxp001', projectName: 'TYC001', dateOfStart: '2018-12-23', teamSize: 'L', inedit: false};
  ngOnInit() {
    let Userid= localStorage.getItem('UserCode');
    this.getCustomerData(Userid);
  }

  onEditClick(event, index: number) {
    // modify the vlaue of inedit
    this.projects[index].inedit = true;
  
    // code logic here
    // ...
    
    
  }

 
  onCancelClick(index: number) {
    this.projects[index].inedit = false;
  
    // code logic here
    // ...
  }


  getCustomerData(Userid){
    if(Userid!==null &&Userid!==""){
      this._CustomerService.getCustomerData(Userid).subscribe(  
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
