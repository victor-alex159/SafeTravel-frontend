import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SearchProductsComponent } from './pages/search-products/search-products.component';
import { FormOrganizationComponent } from './pages/organization/form-organization/form-organization.component';
import { OrganizationListComponent } from './pages/organization/organization-list/organization-list.component';
import { FormProductComponent } from './pages/product/form-product/form-product.component';
import { FormUserComponent } from './pages/user/form-user/form-user.component';
import { ListProductsComponent } from './pages/product/list-products/list-products.component';
import { AuthGuard } from './services/auth-guard.guard';
import { ProductDetailComponent } from './pages/product/product-detail/product-detail.component';


const routes: Routes = [
  { path: 'fl', component: LoginComponent },
  { path: 'uf', component: FormUserComponent },
  { path: 'sp', component: FormProductComponent },
  { path: 'gpd', component: ProductDetailComponent },
  { path: 'sps', component: SearchProductsComponent },
  { path: 'gap', component: ListProductsComponent, canActivate:[AuthGuard] },
  { path: 'so', component: FormOrganizationComponent, canActivate:[AuthGuard]},
  { path: 'gao', component: OrganizationListComponent, canActivate:[AuthGuard] },
  { path: '**', redirectTo: 'sps' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
