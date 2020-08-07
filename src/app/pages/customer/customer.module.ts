import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';

import { CustomerComponent } from './customer.component';
import { Dashboardcomponent } from './Dashboard.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CustomerRoutingModule
    ],
    declarations: [
        CustomerComponent,
        Dashboardcomponent,
      
    ]
})

export class CustomerModule { }