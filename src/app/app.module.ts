// Angular
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { GestureConfig, MAT_FORM_FIELD_DEFAULT_OPTIONS, MatRippleModule, MatInputModule, MatFormFieldModule} from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';

// Angular in memory
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from  '@angular/material';
// Perfect Scroll bar
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
// SVG inline
import { InlineSVGModule } from 'ng-inline-svg';
// NGX Permissions
import { NgxPermissionsModule } from 'ngx-permissions';
// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// State
// import { metaReducers, reducers } from './core/reducers';
// Copmponents
import { AppComponent } from './app.component';
// Modules
import { AppRoutingModule } from './app-routing.module';
// Highlight JS
import { HIGHLIGHT_OPTIONS, HighlightLanguage } from 'ngx-highlightjs';
import * as typescript from 'highlight.js/lib/languages/typescript';
import * as scss from 'highlight.js/lib/languages/scss';
import * as xml from 'highlight.js/lib/languages/xml';
import * as json from 'highlight.js/lib/languages/json';

import { AlertModule } from './component/alert.module'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { JWTTokenService } from './auth/jwt';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// used to create fake backend
import { UserService } from './shared/user.service';
// import { MatSliderModule } from '@angular/material/slider';
import { AuthInterceptor } from './auth/auth.interceptor';
import { LoginComponent } from './user/login/login.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './SuperAdmin/home.component';
import { HomenavComponent } from './SuperAdmin/homenav/homenav.component';
import { SuperAdminDashboardComponent } from './SuperAdmin/dashboard/dashboard.component';
import { SuperAdminProfileComponent } from './SuperAdmin/profile/profile.component';
import { AddUserComponent } from './SuperAdmin/add-user/add-user.component';
import { NavigationBarComponent } from './SystemAdmin/navigation-bar/navigation-bar.component';
import { CustomerDetailComponent } from './SystemAdmin/customer-detail/customer-detail.component';
import { StorageServiceModule} from 'ngx-webstorage-service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SystemAdminComponent } from './SystemAdmin/SystemAdmin.component';
import { SystemAdminDashboardComponent } from './SystemAdmin/dashboard/dashboard.component';
import { SystemAdminProfileComponent } from './SystemAdmin/profile/profile.component';
import { SystemAdminProfileEditComponent } from './SystemAdmin/edit-profile/edit-profile.component';

import { CustomerComponent } from './Customer/Customer.component';
import { CustomerDashboardComponent } from './Customer/dashboard/dashboard.component';
import { CustomerProfileComponent } from './Customer/profile/profile.component';
import { CustomerProfileEditComponent } from './Customer/edit-profile/edit-profile.component';
import { CustomerDispatchOrderDetailComponent } from './Customer/DispatchOrder-detail/DispatchOrder-detail.component';
import { ProgressSpinnerOverviewExample} from './component/loader/progress-spinner-overview-example';
import { PaginationService } from './component/pagination/pagination.service';
import { MatMenuModule} from '@angular/material/menu';
import { MatExpansionModule} from '@angular/material/expansion';
import { CustomerInvoiceDetailComponent } from './Customer/Invoice-detail/Invoice-detail.component';
import { CustomerSalesOrderDetailComponent } from './Customer/SalesOrder-detail/SalesOrder-detail.component';
import { DispatchOrderViewComponent } from './Customer/dispatch-order-view/dispatch-order-view.component';
import { CustomerSalesOrderViewComponent } from './Customer/Sales-order-view/Sales-order-view.component';
import { CustomerInvoiceViewComponent } from './Customer/Invoice-view/Invoice-view.component';
import { CustomerCreateOrderComponent } from './Customer/create-order/create-order.component';

import { TokenInterceptor } from './services/token.interceptor';
import { CustomerOrderListComponent } from './Customer/order-list/order-list.component';
import { TechnicalComponent } from './Technical/Technical.component';
import { TechnicalProfileComponent } from './Technical/profile/profile.component';
import { TechnicalDashboardComponent } from './Technical/dashboard/dashboard.component';
import { CustomerOrderViewComponent } from './Customer/order-view/order-view.component';
import { DatePipe } from '@angular/common';
import { UploadEmployeeComponent } from './SystemAdmin/upload-employee/upload-employee.component';
import { EmployeeDetailsComponent } from './SystemAdmin/employee-details/employee-details.component';
import { UploadCustomerComponent } from './SystemAdmin/upload-customer/upload-customer.component';
import { UploadMappingComponent } from './SystemAdmin/upload-mapping/upload-mapping.component';
import { ContentDetailsComponent } from './SystemAdmin/content-details/content-details.component';
import { RoleManagementComponent } from './SystemAdmin/role-management/role-management.component';
import { BroadcastdetailsComponent } from './SystemAdmin/broadcastdetails/broadcastdetails.component';
import { SwitchUserComponent } from './SystemAdmin/switch-user/switch-user.component';
import { ViewComplaintsComponent } from './SystemAdmin/view-complaints/view-complaints.component';
import { UserDetailsComponent } from './SystemAdmin/user-details/user-details.component';
import { UploadUserComponent } from './SystemAdmin/upload-user/upload-user.component';
import { CreateDepartmentComponent } from './SystemAdmin/create-department/create-department.component';

import { CustomerOrderEditComponent } from './Customer/order-edit/order-edit.component';

import {MatNativeDateModule} from '@angular/material/core';

import {MatDatepickerModule} from '@angular/material/datepicker';

import { OrderAnalystComponent } from './OrderAnalyst/order-analyst/order-analyst.component';
import { OrderAnalystPendingOrderListComponent } from './OrderAnalyst/pending-order/pending-order.component';
import { CustomerFloatDataComponent } from './Customer/customer-float-data/customer-float-data.component';
import { CustomerOutStandingComponent } from './Customer/out-standing/out-standing.component';
import { SystemAsideComponent } from './SystemAdmin/system-aside/system-aside.component';
import { CustomerAsideComponent } from './Customer/customer-aside/customer-aside.component';
import { CustomerMenuComponent } from './Customer/customer-menu/customer-menu.component';
import { UserListComponent } from './Customer/user-list/user-list.component';
import { CustomerUploadUserComponent } from './Customer/customer-upload-user/customer-upload-user.component';
import { CustLedgerStatusComponent } from './Customer/cust-ledger-status/cust-ledger-status.component';
import { CustomerLedgerComponent } from './Customer/customer-ledger/customer-ledger.component';
import { PaymentOutstandingComponent } from './Customer/payment-outstanding/payment-outstanding.component';
import { StockComponent } from './Customer/stock/stock.component';
import { CompanyStockComponent } from './Customer/company-stock/company-stock.component';
import { RetailOrdersComponent } from './Customer/retail-orders/retail-orders.component';
import { RaiseComplaintsComponent } from './Customer/raise-complaints/raise-complaints.component';
import { ComplaintStatusComponent } from './Customer/complaint-status/complaint-status.component';
import { CurrentLedgerComponent } from './Customer/current-ledger/current-ledger.component';
import { HistoryComponent } from './Customer/history/history.component';
import { RegisterComponent } from './user/register/register.component';
import { SystemAdminTargetSalesComponent } from './SystemAdmin/target-sales/target-sales.component';
import { CustomerAccountStatementComponent } from './Customer/account-statement/account-statement.component';
import { SystemAdminTargetSalesListComponent } from './SystemAdmin/target-sales-list/target-sales-list.component';


@NgModule({
  declarations: [
    CustomerComponent,
    CustomerInvoiceDetailComponent,
    CustomerDashboardComponent,
    TechnicalComponent,
    TechnicalProfileComponent,
    TechnicalDashboardComponent,
    CustomerProfileEditComponent,
    CustomerProfileComponent,
    CustomerSalesOrderDetailComponent,
    CustomerCreateOrderComponent,
    CustomerDispatchOrderDetailComponent,
    CustomerOrderListComponent,
    AppComponent,
    UserComponent,
    CustomerInvoiceViewComponent,
    CustomerSalesOrderViewComponent,
    SystemAdminProfileComponent,
    SystemAdminDashboardComponent ,
    SystemAdminProfileEditComponent,
    // RegistrationComponent,
    LoginComponent,
    HomeComponent,
    HomenavComponent,
    SuperAdminDashboardComponent,
    SystemAdminComponent,
    SuperAdminProfileComponent,
    AddUserComponent,
    NavigationBarComponent,
    CustomerDetailComponent,
    ProgressSpinnerOverviewExample,
    DispatchOrderViewComponent,
    CustomerOrderViewComponent,

    UploadEmployeeComponent,
    EmployeeDetailsComponent,
    UploadCustomerComponent,
    UploadMappingComponent,
    ContentDetailsComponent,
    RoleManagementComponent,
    BroadcastdetailsComponent,
    SwitchUserComponent,
    ViewComplaintsComponent,
    UserDetailsComponent,
    UploadUserComponent,
    CreateDepartmentComponent,
    CustomerOrderEditComponent,
    OrderAnalystComponent,
    OrderAnalystPendingOrderListComponent,
    CustomerFloatDataComponent,
    CustomerOutStandingComponent,
    SystemAsideComponent,
    CustomerAsideComponent,
    CustomerMenuComponent,
    UserListComponent,
    CustomerUploadUserComponent,
    CustLedgerStatusComponent,
    CustomerLedgerComponent,
    PaymentOutstandingComponent,
    StockComponent,
    CompanyStockComponent,
    RetailOrdersComponent,
    RaiseComplaintsComponent,
    ComplaintStatusComponent,
    CurrentLedgerComponent,
    HistoryComponent,
    RegisterComponent,
    SystemAdminTargetSalesComponent,
    CustomerAccountStatementComponent,
    SystemAdminTargetSalesListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StorageServiceModule,
    // MatSliderModule,
    FormsModule,
    AlertModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
  ],
  providers: [UserService, DatePipe, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },

  PaginationService,
  JWTTokenService,
],
  bootstrap: [AppComponent]
})
export class AppModule {}
