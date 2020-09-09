import { Component, Input, Output, EventEmitter, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { CustomerService } from 'src/app/shared/CustomerService';

import { NgModule } from '@angular/core';
import { ItemMasterService } from 'src/app/shared/ItemMasterService';
import { CustomerFloatDataComponent } from '../customer-float-data/customer-float-data.component';
import { FormControl, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { DeliveryOrderService } from 'src/app/shared/DeliveryOrderService';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { OrderService } from 'src/app/shared/OrderService';
import { AlertService } from 'src/app/component/alert.service';
@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class CustomerOrderEditComponent implements OnInit {

  HeaderData: any;
  name: string;
  ItemMaster;
  othercharges;
  SelectedValue = 2;
  private TotalAmount;
  Pono;
  ShipToName;
  CreditLimit;
  PoDate;
  UOMs;
  AvailableCreditLimit;
  TotalKgs;
  TotalMT;
  CustomerData: any;
  ShipToCode;
  ItemCodeforadd;
  private TotalQuantity;
  AllItemMasterData;
  OrderInfo;
  status;
  OrderID;
  Userid;
  ShipToAddress;
  
  constructor(private _CustomerService: CustomerService, private _ItemMasterService: ItemMasterService,
    private _OrderService: OrderService, private alertService: AlertService,
    private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  ShiptoAddresss: any;
  projects = { projectID: 'wxp001', projectName: 'TYC001', dateOfStart: '2018-12-23', teamSize: 'L', inedit: false };
  ngOnInit() {
    this.Userid = localStorage.getItem('UserCode');
    this.getUOM();
    this.OrderID = this.storage.get('OrderId');
    this.getShiptoAddressData(this.Userid);
    this.getAllOrderDataByOrderNo(this.OrderID);
    this.getAllItemMasterData();
    this.GetOrderHeaderByOrderID(this.OrderID);
   this.CreditLimit();
  }



  getAllOrderDataByOrderNo(OrderNo) {
    this._OrderService.GetOrderDetailsByOrderID(OrderNo).subscribe((data: any) => {
      this.ItemMaster = data as any[];
    });
  }

  GetOrderHeaderByOrderID(OrderNo) {
    this._OrderService.GetOrderHeaderByOrderID(OrderNo).subscribe(
      data => {
        this.OrderInfo = data[0];
        this.UpdateOtherFromData(this.OrderInfo);

      }
    );
  }


  getShipToNameData(Userid) {
    if (Userid !== null && Userid !== "") {
      this._CustomerService.GetShipToAddress(Userid).subscribe((res: any) => {
        this.ShipToAddress = res['0'].Addressvtxt;
        this.ShipToName = res['0'].ShipToNamevtxt;
        this.ShipToCode = res['0'].ShipToCodevtxt;
      })
    }
    else {
      this.router.navigate(['/user/login']);
    }
  }


  updateTotal(Item) {
    let tempamount = 0;
    let tempQuantity = 0;
    for (let j = 0; j < Item.length; j++) {
      let amount = parseFloat(Item[j].Amountdcl);
      let qty = parseInt(Item[j].Quantityint);
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
      this.TotalQuantity = tempQuantity;
      this.TotalAmount = tempamount;
    }
  };

  updateTotalvalue(Item, qty, Ratedcl) {
    if (qty >= 0) {
      if (!qty || !Ratedcl) {
        Item.Amountdcl = 0;
      } else {
        Item.Quantityint = qty;
        Item.Amountdcl = qty * Ratedcl;
      }
    } else {
      qty = 0;
      Item.Quantityint = qty;
      Item.Amountdcl = qty * Ratedcl;
    }

    this.updateTotal(this.ItemMaster);
  };


  updateUOM(ID, Item) {

    this._CustomerService.getUOMById(ID).subscribe(
      data => {
        Item.Uomnvtxt = data[0].AlternativeUnit;
        Item.RateOfConversion = data[0].RateOfConversion;
        Item.Weight = data[0].Weight;
        if (Item.Quantity == null) {
          Item.Quantity = 0
        }
        this.updateTotalUOM(Item, Item.Quantity);
      }
    );

  };


  updateTotalUOM(Item, Quantity) {


    if (Item.RateOfConversion == null || Item.RateOfConversion == '') {
      this._CustomerService.getUOMById(Item.UoMint).subscribe(
        data => {
          Item.Uomnvtxt = data[0].AlternativeUnit;
          Item.RateOfConversion = data[0].RateOfConversion;
          Item.Weight = data[0].Weight;
          if (Item.Quantity == null) {
            Item.Quantity = 0
          }
          this.updateTotalUOM(Item, Quantity);
        }
      );
    }


    if (Quantity > 0) {
      Item.Quantity = (parseFloat(Quantity)).toFixed(2);
      Item.QtyKg = (parseFloat(Quantity) * parseFloat(Item.Weight)).toFixed(2);
      Item.QtyMt = (parseFloat(Quantity) * parseFloat(Item.RateOfConversion)).toFixed(2);
    } else {
      Item.QtyKg = 0;
      Item.QtyMt = 0;
    }
    let tempqtyKg = 0;
    let tempqtyMt = 0;
    let tempQuantity = 0;
    for (let j = 0; j < this.ItemMaster.length; j++) {
      let qtyKg = parseFloat(this.ItemMaster[j].QtyKg);
      let qtyMt = parseFloat(this.ItemMaster[j].QtyMt);
      let qty = parseFloat(this.ItemMaster[j].Quantity);
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





  getAllItemMasterData() {
    this._ItemMasterService.getAllItemMasterData().subscribe(
      data => {
        this.AllItemMasterData = data;
      }
    );
  }
  ChangeItemCodeForNewItem(ItemCode) {
    this.ItemCodeforadd = ItemCode;
  }

  getUOM() {
    this._CustomerService.getUOM().subscribe((res: any) => {
      this.UOMs = res;
    })
  }


  getUOMNotId(Item) {
    this._CustomerService.getUomnNotId(Item.UoMint).subscribe((res: any) => {
      this.UOMs = res;
    })
  }
  UpdateOtherFromData(Data) {
    this.Pono = Data.RefNovtxt;
    this.PoDate = Data.RefDatedate;
    this.ShipToAddress = Data.ShipToAddressvtxt;
    this.TotalAmount = Data.TotalNetValuedcl;
    this.TotalQuantity = Data.TotalOrderQuantityint;
    this.othercharges = Data.OtherCharges1dcl;
    this.ShipToName = Data.ShipToNamevtxt;
    this.ShipToCode = Data.ShipToCodevtxt;
  }
  AddDataInItemMaster() {
    if (this.ItemCodeforadd != 'undefined' && this.ItemCodeforadd != 0 && this.ItemCodeforadd != '' && this.ItemCodeforadd != null) {
      let AddItem = false;
      if (this.ItemMaster.length > 0) {
        for (let i = 0; i < this.ItemMaster.length; i++) {
          if (this.ItemMaster[i].MaterialCodevtxt != this.ItemCodeforadd) {
            AddItem = true;
          } else {
            AddItem = false;
            return;
          }
        }
      } else {
        AddItem = true;
      }

      if (AddItem == true) {
        this._ItemMasterService.getItemMasterDataByKeyword(this.ItemCodeforadd).subscribe(
          data => {
            let item = {
              MaterialCodevtxt: data['0'].ItemCodevtxt,
              MaterialDescriptionvtxt: data['0'].ItemDescvtxt,
              UoMvtxt: data['0'].Uomnvtxt,
              HSNCodevtxt: data['0'].HSNCodevtxt,
              Ratedcl: data['0'].Ratedcl,
              Quantityint: 0,
              Amountdcl: 0,
            }
            this.ItemMaster.push(item);
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

  onSubmit(type) {
    if (this.ShiptoAddresss != '' && this.ShiptoAddresss != null && this.TotalQuantity != 0 && this.TotalQuantity != null && this.TotalQuantity != '') {
      this.UpdateHeaderData(type);
      this.DeleteDetailData();
      this.UpdateOrderHeader(this.HeaderData, this.ItemMaster);
      this.Redirect(this.status);
    } else {
      this.alertService.warn("Please fill the mandatory fields..");
    }

  }

  DeleteDetailData() {
    this._OrderService.DeleteOrderDetails(this.OrderID).subscribe(
      (res: any) => {

      },
      err => {
        if (err.status == 400)
          this.alertService.error('Error Data not updated.');
        else
          console.log(err);
      }
    );
  }

  InsertOrderDetails(OrderDetails, id) {
    this.status = 1;
    for (let i = 0; i <= OrderDetails.length; i++) {

      if (OrderDetails[i].Quantityint > 0) {
        let orderdetail = {
          OrderID: id,
          MaterialCodevtxt: OrderDetails[i].MaterialCodevtxt,
          MaterialDescriptionvtxt: OrderDetails[i].MaterialDescriptionvtxt,
          UoMvtxt: OrderDetails[i].UoMvtxt,
          Quantityint: OrderDetails[i].Quantityint,
          Ratedcl: OrderDetails[i].Ratedcl,
          Amountdcl: OrderDetails[i].Amountdcl,
        }
        this._OrderService.InsertOrderDetails(orderdetail).subscribe(
          (res: any) => {

            this.status = 0;
          },
          err => {
            if (err.status == 400)
              this.alertService.error('Error Order not Inserted.');
            else
              console.log(err);
            this.status = 1;
            return
          }
        );
      }
    }

  }


  Redirect(status) {
    if (status == 0) {
      this.router.navigateByUrl('/Customer/OrderList');
      this.alertService.success('Order Inserted.');
    }
  }

  UpdateOrderHeader(OrderHeader, OrderDetails) {
    this._OrderService.UpdateOrderHeader(OrderHeader).subscribe(
      (res: any) => {
        this.InsertOrderDetails(OrderDetails, res);
      },
      err => {
        if (err.status == 400)
          this.alertService.error('Error Data not updated.');
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
      IDbint: this.OrderID,
      OrderNovtxt: this.OrderInfo.OrderNovtxt,
      OrderDatedate: this.OrderInfo.OrderDatedate,
      RefNovtxt: this.Pono,
      RefDatedate: this.PoDate,
      SAPOrderNovtxt: null,
      SAPOrderDatedate: null,
      CustomerCodevtxt: this.OrderInfo.CustomerCodevtxt,
      CustomerNamevtxt: this.OrderInfo.CustomerNamevtxt,
      Divisionvtxt: this.OrderInfo.Divisionvtxt,
      ShipToCodevtxt: this.ShipToCode,
      ShipToNamevtxt: this.ShipToName,
      ShipToAddressvtxt: this.ShipToAddress,
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
  Back() {
    this.router.navigateByUrl('/Customer/OrderList');
  }

  
  getAllCreditLimit() {  
    this._CustomerService.getAllCreditLimitforDashboard(localStorage.getItem('UserCode')).subscribe((res: any) => {  
      this.CreditLimit = res;  
    })  
     this._CustomerService.getAllAvailableCreditLimitforDashboard(localStorage.getItem('UserCode')).subscribe((res: any) => {  
      this.AvailableCreditLimit = res;  
    })  
  }  
}
