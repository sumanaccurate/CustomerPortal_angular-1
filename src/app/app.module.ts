import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from '@app/_core/_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from '@app/_core/_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from '@app/_core/_components';
import { HomeComponent } from './home';
import { SuperAdminComponent } from '@app/pages/SuperAdmin';


import { LoginComponent } from './login/login.component';
import * as $ from 'jquery';

@NgModule({
  imports: [
      BrowserModule,
      ReactiveFormsModule,
      HttpClientModule,
      AppRoutingModule
  ],
  declarations: [
      AppComponent,
      AlertComponent,
      HomeComponent,
      SuperAdminComponent
  ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

      // provider used to create fake backend
      fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { };