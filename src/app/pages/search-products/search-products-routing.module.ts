import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchProductsComponent } from './search-products.component';


const routes: Routes = [
  { path: 'sps', component: SearchProductsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchProductsRoutingModule { }
