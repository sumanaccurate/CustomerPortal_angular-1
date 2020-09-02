import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { CustomerService } from 'src/app/shared/CustomerService';
import { ItemMasterService } from 'src/app/shared/ItemMasterService';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CustomerCreateOrderComponent implements OnInit {
  CustomerData: any; 
  ShipToAddress;
  ItemMaster;
  AllItemMasterDate;
  constructor(private _CustomerService: CustomerService,private _ItemMasterService:ItemMasterService,
     private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  ShiptoAddresss: any; 
  projects={projectID: 'wxp001', projectName: 'TYC001', dateOfStart: '2018-12-23', teamSize: 'L', inedit: false};
  ngOnInit() {
    let Userid= localStorage.getItem('UserCode');
    this.getCustomerData(Userid);
    this.getShiptoAddressData(Userid);
    this.GetTopItemMaster();
    this.getAllItemMasterData();
  }

  getShipToNameData(Userid){
    if(Userid!==null &&Userid!==""){
      this._CustomerService.GetShipToAddress(Userid).subscribe((res: any) => {  
        this.ShipToAddress = res['0'].Addressvtxt;
      })  
    }
    else{
      this.router.navigate(['/user/login']);
    }
  }

  
  getAllItemMasterData(){
     this._ItemMasterService.getAllItemMasterData().subscribe(  
        data => {  
         this.AllItemMasterDate = data;
        }  
      );  
  }
  AddDataInItemMaster(ItemCode){
    this._ItemMasterService.getItemMasterDataByKeyword(ItemCode).subscribe(  
      data => {  
       this.ItemMaster.push(data['0']); 
      }  
    );  
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


  onDeleteClick(i) {
    // const index: number = this.ItemMaster.indexOf(msg);
    if (i !== -1) {
        this.ItemMaster.splice(i, 1);
    }        
}
  
  GetTopItemMaster(){
      this._ItemMasterService.GetTopItemMaster().subscribe(  
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
