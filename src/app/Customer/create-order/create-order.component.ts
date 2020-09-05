import { Component, Input, Output, EventEmitter, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { CustomerService } from 'src/app/shared/CustomerService';
import { ItemMasterService } from 'src/app/shared/ItemMasterService';
import { FormControl, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CustomerFloatDataComponent } from '../customer-float-data/customer-float-data.component';
import { DeliveryOrderService } from 'src/app/shared/DeliveryOrderService';
import { MatInputModule } from '@angular/material/input';
import { OrderService } from 'src/app/shared/OrderService';
import { AlertService } from 'src/app/component/alert.service';
@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CustomerCreateOrderComponent implements OnInit {
  HeaderData: any;
  ShipTo;
  name: string;
  ItemMaster;
  othercharges;
  private TotalAmount;
  Pono;
  CustomerData: any;
  PoDate;
  ItemCodeforadd;
  OutStanding;
  CreditLimit;
  status;
  private TotalQuantity;
  AllItemMasterDate;
  OrderInfo;
  Userid;
  Addressvtxt
  constructor(private _CustomerService: CustomerService, private _ItemMasterService: ItemMasterService,
    private _OrderService: OrderService, private alertService: AlertService,
    private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  ShiptoAddresss: any;
  projects = { projectID: 'wxp001', projectName: 'TYC001', dateOfStart: '2018-12-23', teamSize: 'L', inedit: false };
  ngOnInit() {
    this.Userid = localStorage.getItem('UserCode');
    this.getAllCreditLimitforDashboard();
    this.getAllOutStandingforDashboard();
    this.getCustomerData(this.Userid);
    this.getShiptoAddressData(this.Userid);
    this.GetTopItemMaster();
    this.getAllItemMasterData();
    this.getOrderInfo();
    this.ShipTo.Addressvtxt = '';
  }

  getAllOutStandingforDashboard() {  
    this._CustomerService.getAllOutStandingforDashboard(localStorage.getItem('UserCode')).subscribe((res: any) => {  
      this.OutStanding = res;  
    })  
  }  
  getAllCreditLimitforDashboard() {  
    this._CustomerService.getAllCreditLimitforDashboard(localStorage.getItem('UserCode')).subscribe((res: any) => {  
      this.CreditLimit = res;  
    })  
  }  
  getShipToNameData(Userid) {
    if (Userid !== null && Userid !== "") {
      this._CustomerService.GetShipToAddress(Userid).subscribe((res: any) => {
        this.Addressvtxt = res['0'].Addressvtxt;
        this.ShipTo = res['0'];
      })
    }
    else {
      this.router.navigate(['/user/login']);
    }
  }

  getOrderInfo() {
    this._OrderService.getOrderInfo().subscribe(
      data => {
        this.OrderInfo = data['0'];
      }
    );
  }

  updateTotal(Item) {
    let tempamount = 0;
    let tempQuantity = 0;
    for (let j = 0; j < Item.length; j++) {
      let amount = parseFloat(Item[j].Amount) ;
      let qty = parseFloat( Item[j].Quantity);
      if (!qty) {
        qty = 0;
      } else {
        tempQuantity += qty;
      }
      if (!amount) {
        amount = 0;
      } else {
        tempamount += amount;
      }
      this.TotalQuantity = tempQuantity.toFixed(2);
      this.TotalAmount = tempamount.toFixed(2);
    }
  };

  updateTotalvalue(Item, qty, Ratedcl) {

    if (qty >= 0) {
      if (!qty || !Ratedcl) {
        Item.Amount = 0;
      } else {
        Item.Quantity = qty;
        Item.Amount = qty * Ratedcl;
      }
    } else {
      qty = 0;
      Item.Quantity = qty;
      Item.Amount = qty * Ratedcl;
    }

    this.updateTotal(this.ItemMaster);
  };

  getAllItemMasterData() {
    this._ItemMasterService.getAllItemMasterData().subscribe(
      data => {
        this.AllItemMasterDate = data;
      }
    );
  }
  ChangeItemCodeForNewItem(ItemCode) {
    this.ItemCodeforadd=ItemCode;
  }
  AddDataInItemMaster() {
    if(this.ItemCodeforadd!='undefined'&& this.ItemCodeforadd!=0 && this.ItemCodeforadd!=''&&this.ItemCodeforadd!=null){
      let AddItem=false;
      for (let i = 0; i < this.ItemMaster.length; i++) {
        if( this.ItemMaster[i].ItemCodevtxt != this.ItemCodeforadd){
          AddItem=true;
        }else{
          AddItem=false;
          return;
        }
      }
      if(AddItem==true){
        this._ItemMasterService.getItemMasterDataByKeyword(this.ItemCodeforadd).subscribe(
          data => {
            this.ItemMaster.push(data['0']);
          }
        );
        this.updateTotal(this.ItemMaster);
      }
    }
    
  }

  getShiptoAddressData(Userid) {
    if (Userid !== null && Userid !== "") {

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
    this.updateTotal(this.ItemMaster);
  }

  GetTopItemMaster() {
    this._ItemMasterService.GetTopItemMaster().subscribe(
      data => {
        this.ItemMaster = data;
      }
    );
  }

  getCustomerData(Userid) {
    if (Userid !== null && Userid !== "") {
      this._CustomerService.getCustomerData(Userid).subscribe(
        data => {
          this.CustomerData = data['0'];
        }
      );
    }
    else {
      this.router.navigate(['/user/login']);
    }
  }

  onSubmit(type) {
    if(this.ShiptoAddresss!=''&&this.ShiptoAddresss!=null&&this.TotalQuantity!=0&&this.TotalQuantity!=null&&this.TotalQuantity!=''){
      this.getOrderInfo();
      this.UpdateHeaderData(type);
      this.InsertOrderHeader(this.HeaderData, this.ItemMaster);
      this.Redirect(this.status);
    }else{
      this.alertService.warn("Please fill the mandatory fields..");
    }
    
  }


  InsertOrderDetails(OrderDetails, id) {
this.status = 1;
    for (let i = 0; i <= OrderDetails.length; i++) {

      if( OrderDetails[i].Quantity>0){
        let orderdetail = {
          OrderID: id,
          MaterialCodevtxt: OrderDetails[i].ItemCodevtxt,
          MaterialDescriptionvtxt: OrderDetails[i].ItemDescvtxt,
          UoMvtxt: OrderDetails[i].Uomnvtxt,
          Quantityint: OrderDetails[i].Quantity,
          Ratedcl: OrderDetails[i].Ratedcl,
          Amountdcl: OrderDetails[i].Amount,
        }
        this._OrderService.InsertOrderDetails(orderdetail).subscribe(
          (res: any) => {
          
            this.status =0;
          },
          err => {
            if (err.status == 400)
              this.alertService.error('Error Order not Inserted.');
            else
              console.log(err);;
              this.status=1;
              return
          }
        );
      }
    }
  }

Redirect(status){
  if(status==0){
    this.router.navigateByUrl('/Customer/OrderList');
    this.alertService.success('Order Inserted.');
  }
}


  InsertOrderHeader(OrderHeader, OrderDetails) {
    this._OrderService.InsertOrderHeader(OrderHeader).subscribe(
      (res: any) => {
        this.InsertOrderDetails(OrderDetails, res);
      },
      err => {
        if (err.status == 400)
          this.alertService.error('Error user not updated.');
        else
          console.log(err);
      }
    );
  }
  updatePoDate(value) {
    this.PoDate = value;
  }
  updatePono(value) {
    this.Pono = value;
  }
  updateothercharges(value) {
    this.othercharges = value;
  }

  UpdateHeaderData(type) {
    this.HeaderData = {
      OrderNovtxt: this.OrderInfo.ReqOrderNo,
      OrderDatedate: this.OrderInfo.OrderDatedate,
      RefNovtxt: this.Pono,
      RefDatedate: this.PoDate,
      SAPOrderNovtxt: null,
      SAPOrderDatedate: null,
      CustomerCodevtxt: this.CustomerData.CustCodevtxt,
      CustomerNamevtxt: this.CustomerData.CustNamevtxt,
      Divisionvtxt: this.CustomerData.DivisionCdvtxt,
      ShipToCodevtxt: this.ShipTo.ShipToCodevtxt,
      ShipToNamevtxt: this.ShipTo.ShipToNamevtxt,
      ShipToAddressvtxt: this.ShipTo.Addressvtxt,
      TotalNetValuedcl: this.TotalAmount,
      TotalOrderQuantityint: this.TotalQuantity,
      SAPStatusvtxt: null,
      OtherCharges1dcl: this.othercharges,
      OtherCharges2dcl: 0.00,
      OtherCharges3dcl: 0.00,
      OtherCharges4dcl: 0.00,
      Statusvtxt: type,
      CreatedByvtxt: this.Userid,
    }
    console.log(this.HeaderData);
  }
  Back(){
    this.router.navigateByUrl('/Customer/OrderList');
  }
}
