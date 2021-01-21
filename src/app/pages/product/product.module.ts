import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { InfoCommentaryProductComponent } from './info-commentary-product/info-commentary-product.component';
import { ListProductsComponent } from './list-products/list-products.component';

import { DevExtremeModule } from 'devextreme-angular';
import {NgxPaginationModule} from 'ngx-pagination';
import { SideBarComponent } from 'src/app/shared/side-bar/side-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormProductDetailComponent } from './product-detail/form-product-detail/form-product-detail.component';
import { FormProductComponent } from './form-product/form-product.component';
import { DxCheckBoxModule,
  DxSelectBoxModule,
  DxNumberBoxModule,
  DxDataGridModule,
  DxFormModule,
  DxTemplateModule,
  DxFileUploaderModule,
  DxGalleryModule,
  DxPopupModule,
  DxSpeedDialActionModule,
  DxListModule,
  DxTextBoxModule
  } from 'devextreme-angular';
import { ListRestaurantComponent } from './type/list-restaurant/list-restaurant.component';

@NgModule({
  declarations: [ProductDetailComponent, InfoCommentaryProductComponent, ListProductsComponent, SideBarComponent, FormProductDetailComponent, FormProductComponent, ListRestaurantComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NgxPaginationModule,
    DevExtremeModule,
    FontAwesomeModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxDataGridModule,
    DxFormModule,
    DxTemplateModule,
    DxFileUploaderModule,
    DxGalleryModule,
    DxPopupModule,
    DxSpeedDialActionModule,
    DxListModule,
    DxTextBoxModule
  ]
})
export class ProductModule { }
