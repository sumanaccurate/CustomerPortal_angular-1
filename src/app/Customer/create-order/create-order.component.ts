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
  ShipToName;
  ItemMaster;
  constructor(private _CustomerService: CustomerService, private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  ShiptoAddresss: any; 
  projects={projectID: 'wxp001', projectName: 'TYC001', dateOfStart: '2018-12-23', teamSize: 'L', inedit: false};
  ngOnInit() {
    let Userid= localStorage.getItem('UserCode');
    this.getCustomerData(Userid);
    this.getShiptoAddressData(Userid);
    this.GetTopItemMaster();
  }

  getShipToNameData(Userid){
    if(Userid!==null &&Userid!==""){
      this._CustomerService.GetShipToAddress(Userid).subscribe((res: any) => {  
        this.ShipToName = res['0'].Addressvtxt;
      })  
    }
    else{
      this.router.navigate(['/user/login']);
    }
  }

  
  getShiptoAddressData(Userid){
    if(Userid!==null &&Userid!==""){
     
      this._CustomerService.getGetShipToData(Userid).subscribe(  
        data => {  
         this.ShiptoAddresss = data;
        }  
      );  
    }
  }

  
  GetTopItemMaster(){
      this._CustomerService.GetTopItemMaster().subscribe(  
        data => {  
         this.ItemMaster = data;
        }  
      );  
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
