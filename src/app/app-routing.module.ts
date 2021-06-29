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
import { ListRestaurantComponent } from './pages/product/type/list-restaurant/list-restaurant.component';
import { InfoCommentaryProductComponent } from './pages/product/info-commentary-product/info-commentary-product.component';


const routes: Routes = [
  /*{ path: 'fl', component: LoginComponent },
  { path: 'uf', component: FormUserComponent },
  { path: 'sp', component: FormProductComponent },
  { path: 'gpd', component: ProductDetailComponent },
  { path: 'gpd/:name', component: ProductDetailComponent },
  { path: 'sps', component: SearchProductsComponent },
  { path: 'icp/:id', component: InfoCommentaryProductComponent },
  { path: 'gpbr', component: ListRestaurantComponent },
  { path: 'gap', component: ListProductsComponent, canActivate:[AuthGuard] },
  { path: 'so', component: FormOrganizationComponent, canActivate:[AuthGuard]},
  { path: 'gao', component: OrganizationListComponent, canActivate:[AuthGuard] },
  { path: '**', redirectTo: 'sps' }*/

  { path: 'log', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'services', loadChildren: () => import('./pages/services/services.module').then(m => m.ServicesModule) },
  { path: 'us', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule) },
  { path: 'pr', loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule) },
  { path: 'main', loadChildren: () => import('./pages/search-products/search-products.module').then(m=> m.SearchProductsModule) },
  { path: 'org', loadChildren: () => import('./pages/organization/organization.module').then(m => m.OrganizationModule) },
  { path: 'inf', loadChildren: () => import('./pages/information/information.module').then(m => m.InformationModule) },
  { path: '**', redirectTo: 'main/sps' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
