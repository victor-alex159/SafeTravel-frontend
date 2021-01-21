import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth-guard.guard';
import { FormOrganizationComponent } from './form-organization/form-organization.component';
import { OrganizationListComponent } from './organization-list/organization-list.component';


const routes: Routes = [
  { path: 'so', component: FormOrganizationComponent, canActivate:[AuthGuard]},
  { path: 'gao', component: OrganizationListComponent, canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
