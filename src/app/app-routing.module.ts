import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
// import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './SuperAdmin/home.component';
import { SuperAdminDashboardComponent } from './SuperAdmin/dashboard/dashboard.component';
import { SuperAdminProfileComponent } from './SuperAdmin/profile/profile.component';
import { AddUserComponent } from './SuperAdmin/add-user/add-user.component';
import { CustomerDetailComponent } from './SystemAdmin/customer-detail/customer-detail.component';
import { SystemAdminComponent } from './SystemAdmin/SystemAdmin.component';
import { SystemAdminProfileComponent } from './SystemAdmin/profile/profile.component';
import { SystemAdminProfileEditComponent } from './SystemAdmin/edit-profile/edit-profile.component';
import { SystemAdminDashboardComponent } from './SystemAdmin/dashboard/dashboard.component';
import { ProgressSpinnerOverviewExample } from './component/loader/progress-spinner-overview-example';
import { CustomerComponent } from './Customer/Customer.component';
import { CustomerDashboardComponent } from './Customer/dashboard/dashboard.component';
import { CustomerProfileComponent } from './Customer/profile/profile.component';
import { CustomerProfileEditComponent } from './Customer/edit-profile/edit-profile.component';
import { CustomerDispatchOrderDetailComponent } from './Customer/DispatchOrder-detail/DispatchOrder-detail.component';
import { CustomerInvoiceDetailComponent } from './Customer/Invoice-detail/Invoice-detail.component';
import { CustomerSalesOrderDetailComponent } from './Customer/SalesOrder-detail/SalesOrder-detail.component';
import { DispatchOrderViewComponent } from './Customer/dispatch-order-view/dispatch-order-view.component';
import { CustomerSalesOrderViewComponent } from './Customer/Sales-order-view/Sales-order-view.component';
import { CustomerInvoiceViewComponent } from './Customer/Invoice-view/Invoice-view.component';
import { CustomerCreateOrderComponent } from './Customer/create-order/create-order.component';
const routes: Routes = [
  { path: '', redirectTo: '/user/login', pathMatch: 'full' },
  {
    path: 'user', component: UserComponent,
    children: [
      // { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: 'SuperAdmin', component: HomeComponent,
    children: [
      // { path: 'registration', component: RegistrationComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: SuperAdminDashboardComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: SuperAdminProfileComponent, canActivate: [AuthGuard] },
      { path: 'AddAdmin', component: AddUserComponent, canActivate: [AuthGuard] },
      { path: 'EditAdmin', component: AddUserComponent, canActivate: [AuthGuard] },
      { path: 'CustomerDetail', component: CustomerDetailComponent, canActivate: [AuthGuard] },
      { path: 'progress', component: ProgressSpinnerOverviewExample, canActivate: [AuthGuard] },
    ]
  },
  {
    path: 'SystemAdmin', component: SystemAdminComponent,
    children: [
      // { path: 'registration', component: RegistrationComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: SystemAdminDashboardComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: SystemAdminProfileComponent, canActivate: [AuthGuard] },
      { path: 'Editprofile', component: SystemAdminProfileEditComponent, canActivate: [AuthGuard] },
      { path: 'CustomerDetail', component: CustomerDetailComponent, canActivate: [AuthGuard] },
    ]
  },
  {
    path: 'Customer', component: CustomerComponent,
    children: [
      // { path: 'registration', component: RegistrationComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: CustomerDashboardComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: CustomerProfileComponent, canActivate: [AuthGuard] },
      { path: 'Editprofile', component: CustomerProfileEditComponent, canActivate: [AuthGuard] },
      { path: 'DispatchOrderDetail', component: CustomerDispatchOrderDetailComponent, canActivate: [AuthGuard] },
      { path: 'DispatchOrderDetailView', component: DispatchOrderViewComponent, canActivate: [AuthGuard] },
      { path: 'CreateOrderRequest', component: CustomerCreateOrderComponent, canActivate: [AuthGuard] },
      { path: 'InvoiceDetail', component: CustomerInvoiceDetailComponent, canActivate: [AuthGuard] },
      { path: 'InvoiceDetailView', component: CustomerInvoiceViewComponent, canActivate: [AuthGuard] },
      { path: 'SalesOrderDetail', component: CustomerSalesOrderDetailComponent, canActivate: [AuthGuard] },
      { path: 'SalesOrderDetailView', component: CustomerSalesOrderViewComponent, canActivate: [AuthGuard] },
    ]
  },

  // otherwise redirect to home
  { path: '**', redirectTo: 'LoginComponent' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
