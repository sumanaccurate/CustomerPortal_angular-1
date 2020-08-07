import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './SuperAdmin-routing.module';

import { SuperAdminComponent } from './SuperAdmin.component';
import { Dashboardcomponent } from './Dashboard.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SuperAdminRoutingModule
    ],
    declarations: [
        SuperAdminComponent,
        Dashboardcomponent,
      
    ]
})

export class SuperAdminModule { }