import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index1';
import { SuperAdminComponent } from '@app/pages/SuperAdmin';

import { AuthGuard } from '@app/_core/_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const SuperAdminModule = () => import('./pages/SuperAdmin/SuperAdmin.module').then(x => x.SuperAdminModule);

const routes: Routes = [
  { path: '', component: SuperAdminComponent, canActivate: [AuthGuard] },
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
  { path: 'pages', loadChildren: SuperAdminModule, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },

  // otherwise redirect to home
  { path: '**', redirectTo: 'accountModule' },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
