import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { CustomerService } from 'src/app/shared/CustomerService';
import { ItemMasterService } from 'src/app/shared/ItemMasterService';
import { FormControl, FormGroup } from '@angular/forms';
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
  CustomerData: any;
  ShipTo;
  HeaderData;
  ItemMaster;
  othercharges;
  private TotalAmount;
  Pono;
  PoDate;
  private TotalQuantity;
  AllItemMasterDate;
  OrderInfo;
  Userid;
  constructor(private _CustomerService: CustomerService, private _ItemMasterService: ItemMasterService,
    private _OrderService: OrderService, private alertService: AlertService,
    private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  ShiptoAddresss: any;
  projects = { projectID: 'wxp001', projectName: 'TYC001', dateOfStart: '2018-12-23', teamSize: 'L', inedit: false };
  ngOnInit() {
    this.Userid = localStorage.getItem('UserCode');
    this.getCustomerData( this.Userid );
    this.getShiptoAddressData( this.Userid );
    this.GetTopItemMaster();
    this.getAllItemMasterData();
    this.getOrderInfo();
  }

  getShipToNameData(Userid) {
    if (Userid !== null && Userid !== "") {
      this._CustomerService.GetShipToAddress(Userid).subscribe((res: any) => {
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
      let amount = parseFloat(Item[j].Amount);
      let qty = parseInt(Item[j].Quantity);
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
  AddDataInItemMaster(ItemCode) {
    this._ItemMasterService.getItemMasterDataByKeyword(ItemCode).subscribe(
      data => {
        this.ItemMaster.push(data['0']);
      }
    );
    this.updateTotal(this.ItemMaster);
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

  onSubmit() {
    this.getOrderInfo();
    let HeaderData = new FormGroup({
      OrderNovtxt :this.OrderInfo.ReqOrderNo,
      OrderDatedate :this.OrderInfo.OrderDatedate,
      RefNovtxt :this.Pono,
      RefDatedate :this.PoDate,
      SAPOrderNovtxt :null,
      SAPOrderDatedate :null,
      CustomerCodevtxt :this.CustomerData.CustCodevtxt,
      CustomerNamevtxt : this.CustomerData.CustNamevtxt,
      Divisionvtxt : this.CustomerData.DivisionCdvtxt,
      ShipToCodevtxt : this.ShipTo.ShipToCodevtxt,
      ShipToNamevtxt : this.ShipTo.ShipToNamevtxt,
      ShipToAddressvtxt :this.ShipTo.Addressvtxt,
      TotalNetValuedcl : this.TotalAmount,
      TotalOrderQuantityint :this.TotalQuantity,
      SAPStatusvtxt : null,
      OtherCharges1dcl :this.othercharges,
      OtherCharges2dcl :null,
      OtherCharges3dcl : null,
      OtherCharges4dcl :null,
      Statusvtxt : null,
      CreatedByvtxt : this.Userid,
  
    })

    
this.InsertOrderHeader(HeaderData,this.ItemMaster);
  }


  InsertOrderDetails(OrderDetails) {
    this._OrderService.InsertOrderDetails(OrderDetails).subscribe(
      (res: any) => {
        this.router.navigate(['/user/login']);
        this.alertService.error('Error user not updated.');
      },
      err => {
        if (err.status == 400)
          this.alertService.error('Error user not updated.');
        else
          console.log(err);
      }
    );
  }


  InsertOrderHeader(OrderHeader, OrderDetails) {
    this._OrderService.InsertOrderHeader(OrderHeader).subscribe(
      (res: any) => {
        this.InsertOrderDetails(OrderDetails);
      },
      err => {
        if (err.status == 400)
          this.alertService.error('Error user not updated.');
        else
          console.log(err);
      }
    );
  }


}
