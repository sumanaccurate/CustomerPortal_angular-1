import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuperAdminComponent } from './SuperAdmin.component';
import { Dashboardcomponent } from './Dashboard.component';
const routes: Routes = [
    {
        path: '', component: SuperAdminComponent,
        children: [
            { path: 'Dashboard', component: Dashboardcomponent },
           
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SuperAdminRoutingModule { }