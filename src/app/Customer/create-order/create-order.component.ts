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
  DeliveryAddress;
  othercharges;
  private TotalAmount;
  Pono;
  CustomerData: any;
  UOMs : any;
  PoDate;
  TotalMT;
  TotalKgs;
  ItemCodeforadd;
  OutStanding;
  AvailableCreditLimit;
  CreditLimit;
  AlternativeUnit;
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
    this.getUOM();
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
     this._CustomerService.getAllAvailableCreditLimitforDashboard(localStorage.getItem('UserCode')).subscribe((res: any) => {  
      this.AvailableCreditLimit = res;  
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

  getUOM() {
      this._CustomerService.getUOM().subscribe((res: any) => {
        this.UOMs = res;
      })
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

  
  updateTotalUOM(Item,Quantity) {
    if(Item.RateOfConversion==null ||Item.RateOfConversion==''){
      this.alertService.error('Please Select Unit Of Measurement First');
      return null;
    }
    
    if( Quantity>0){
      Item.Quantity = ( parseFloat(Quantity)).toFixed(2);
      Item.QtyKg=( parseFloat(Quantity) *  parseFloat(Item.Weight)).toFixed(2);
      Item.QtyMt= (parseFloat(Quantity )* parseFloat(Item.RateOfConversion)).toFixed(2);
    }else{
      Item.QtyKg=0;
      Item.QtyMt=0;
    }
    let tempqtyKg = 0;
    let tempqtyMt = 0;
    let tempQuantity = 0;
    for (let j = 0; j < this.ItemMaster.length; j++) {
      let qtyKg = parseFloat(this.ItemMaster[j].QtyKg) ;
      let qtyMt = parseFloat( this.ItemMaster[j].QtyMt);
      let qty = parseFloat( this.ItemMaster[j].Quantity);
      if (!qty) {
        qty = 0;
      } else {
        tempQuantity += qty;
      }
      if (!qtyMt) {
        qtyMt = 0;
      } else {
        tempqtyMt += qtyMt;
      }
      if (!qtyKg) {
        qtyKg = 0;
      } else {
        tempqtyKg += qtyKg;
      }
      this.TotalMT = tempqtyMt.toFixed(2);
      this.TotalQuantity = tempQuantity.toFixed(2);
      this.TotalKgs = tempqtyKg.toFixed(2);
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

  
  updateUOM(ID,Item) {
   
    this._CustomerService.getUOMById(ID).subscribe(
      data => {
        Item.Uomnvtxt =  data[0].AlternativeUnit;
        Item.RateOfConversion= data[0].RateOfConversion;
        Item.Weight= data[0].Weight;
        if(Item.Quantity==null){
          Item.Quantity=0
        }
            this.updateTotalUOM(Item,Item.Quantity);
      }
    );

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
this.status = 1;
      this.getOrderInfo();
      this.UpdateHeaderData(type);
      this.InsertOrderHeader(this.HeaderData, this.ItemMaster);
     
    }else{
      this.alertService.warn("Please fill the mandatory fields..");
    }
    
  }


  InsertOrderDetails(OrderDetails, id) {
    for (let i = 0; i < OrderDetails.length; i++) {

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
            this.Redirect(this.status,id);
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

Redirect(status,value){
  if(status==0){
    this.storage.set('OrderId', value);
    this.router.navigateByUrl('/Customer/OrderView');
    // this.router.navigateByUrl('/Customer/OrderList');
    this.alertService.success('Order Inserted.');
  }
}


  InsertOrderHeader(OrderHeader, OrderDetails) {
    this._OrderService.InsertOrderHeader(OrderHeader).subscribe(
      (res: any) => {
        this.InsertOrderDetails(OrderDetails, res);
      },
      err => { 
        this.alertService.error('An error occured');
        if (err.status == 400)
          this.alertService.error('Due to some error order not inserted.');
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

  updateAddress(value) {
    this.DeliveryAddress = value;
  }
  UpdateHeaderData(type) {
    if(this.Pono==null||this.Pono==''){
      this.Pono=null;
    }
    if(this.PoDate==null||this.PoDate==''){
      this.PoDate=null;
    }

    this.HeaderData = {
      OrderNovtxt: this.OrderInfo.ReqOrderNo,
      OrderDatedate: this.OrderInfo.OrderDatedate,
      RefNovtxt: this.Pono,
      RefDatedate: this.PoDate,
      CustomerCodevtxt: this.CustomerData.CustCodevtxt,
      CustomerNamevtxt: this.CustomerData.CustNamevtxt,
      Divisionvtxt: this.CustomerData.DivisionCdvtxt,
      ShipToCodevtxt: this.ShipTo.ShipToCodevtxt,
      ShipToNamevtxt: this.ShipTo.ShipToNamevtxt,
      ShipToAddressvtxt: this.ShipTo.Addressvtxt,
      DeliveryAddressvtxt: this.DeliveryAddress,
      TotalOrderQuantityint: this.TotalQuantity,
      Statusvtxt: type,
      CreatedByvtxt: this.Userid,

    }
    console.log(this.HeaderData);
  }
  Back(){
    this.router.navigateByUrl('/Customer/OrderList');
  }
}
