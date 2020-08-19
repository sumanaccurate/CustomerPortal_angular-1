import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// used to create fake backend
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as $ from 'jquery';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from '@app/shared/user.service';
// import { MatSliderModule } from '@angular/material/slider';
import { AuthInterceptor } from './auth/auth.interceptor';
import { LoginComponent } from '@app/user/login/login.component';
import { UserComponent } from '@app/user/user.component';
import { HomeComponent } from '@app/SuperAdmin/home.component';
import { HomenavComponent } from './SuperAdmin/homenav/homenav.component';
import { DashboardComponent } from './SuperAdmin/dashboard/dashboard.component';
import { ProfileComponent } from './SuperAdmin/profile/profile.component';
import { AddUserComponent } from './SuperAdmin/add-user/add-user.component';
import { NavigationBarComponent } from './SystemAdmin/navigation-bar/navigation-bar.component';
import { CustomerDetailComponent } from './SystemAdmin/customer-detail/customer-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    // RegistrationComponent,
    LoginComponent,
    HomeComponent,
    HomenavComponent,
    DashboardComponent,
    ProfileComponent,
    AddUserComponent,
    NavigationBarComponent,
    CustomerDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // MatSliderModule,
    FormsModule,
  ],
  providers: [UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { };
