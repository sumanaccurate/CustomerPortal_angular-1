// Angular
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { GestureConfig} from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';
// Angular in memory
// Perfect Scroll bar
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
// SVG inline
import { InlineSVGModule } from 'ng-inline-svg';
// Hammer JS
import 'hammerjs';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

import { SystemAdminComponent } from './SystemAdmin/SystemAdmin.component';
import { SystemAdminDashboardComponent } from './SystemAdmin/dashboard/dashboard.component';
import { SystemAdminProfileComponent } from './SystemAdmin/profile/profile.component';
import { SystemAdminProfileEditComponent } from './SystemAdmin/edit-profile/edit-profile.component';
import {ProgressSpinnerOverviewExample} from './component/loader/progress-spinner-overview-example';
import { PaginationService } from './component/pagination/pagination.service';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
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
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
  ],
 
  providers: [UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  PaginationService,
  JWTTokenService,
],
  bootstrap: [AppComponent]
})
export class AppModule { };
