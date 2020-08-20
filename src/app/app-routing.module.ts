import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 import { UserComponent } from './user/user.component';
// import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './SuperAdmin/home.component';
import { DashboardComponent } from './SuperAdmin/dashboard/dashboard.component';
import { ProfileComponent } from './SuperAdmin/profile/profile.component';
import { AddUserComponent } from './SuperAdmin/add-user/add-user.component';
import { CustomerDetailComponent } from './SystemAdmin/customer-detail/customer-detail.component';


const routes: Routes = [
  {path:'',redirectTo:'/user/login',pathMatch:'full'},
  {
    path: 'user', component: UserComponent,
    children: [
      // { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  {path:'SuperAdmin',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'SuperAdmin/dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'SuperAdmin/profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'SuperAdmin/AddAdmin',component:AddUserComponent,canActivate:[AuthGuard]},
  {path:'SuperAdmin/EditAdmin',component:AddUserComponent,canActivate:[AuthGuard]},
  {path:'SystemAdmin/CustomerDetail',component:CustomerDetailComponent,canActivate:[AuthGuard]},

  // otherwise redirect to home
  { path: '**', redirectTo: 'LoginComponent' },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
