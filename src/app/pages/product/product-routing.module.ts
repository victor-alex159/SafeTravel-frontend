import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth-guard.guard';
import { InfoCommentaryProductComponent } from './info-commentary-product/info-commentary-product.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ListHotelComponent } from './type/list-hotel/list-hotel.component';
import { ListRestaurantComponent } from './type/list-restaurant/list-restaurant.component';


const routes: Routes = [
  { path: 'gpd', component: ProductDetailComponent },
  { path: 'gpd/:name', component: ProductDetailComponent },
  { path: 'icp/:id', component: InfoCommentaryProductComponent },
  { path: 'gpbr', component: ListRestaurantComponent },
  { path: 'gpbh', component: ListHotelComponent },
  { path: 'gap', component: ListProductsComponent, canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
