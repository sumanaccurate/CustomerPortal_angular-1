import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerComponent } from './customer.component';
import { Dashboardcomponent } from './Dashboard.component';
const routes: Routes = [
    {
        path: '', component: CustomerComponent,
        children: [
            { path: 'Dashboard', component: Dashboardcomponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }