import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SearchProductsComponent } from './pages/search-products/search-products.component';
import { FormOrganizationComponent } from './pages/organization/form-organization/form-organization.component';
import { OrganizationListComponent } from './pages/organization/organization-list/organization-list.component';
import { FormProductComponent } from './pages/product/form-product/form-product.component';
import { FormUserComponent } from './pages/user/form-user/form-user.component';
import { ListProductsComponent } from './pages/product/list-products/list-products.component';


const routes: Routes = [
  { path: 'fl', component: LoginComponent },
  { path: 'uf', component: FormUserComponent },
  { path: 'sp', component: FormProductComponent },
  { path: 'gap', component: ListProductsComponent },
  { path: 'sps', component: SearchProductsComponent },
  { path: 'so', component: FormOrganizationComponent },
  { path: 'gao', component: OrganizationListComponent },
  { path: '**', redirectTo: 'fl' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
