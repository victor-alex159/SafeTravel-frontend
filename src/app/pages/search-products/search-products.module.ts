import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchProductsRoutingModule } from './search-products-routing.module';
import { DevExtremeModule } from 'devextreme-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
  DxListModule
  } from 'devextreme-angular';
import { SearchProductsComponent } from './search-products.component';

@NgModule({
  declarations: [ SearchProductsComponent],
  imports: [
    CommonModule,
    SearchProductsRoutingModule,
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
    DxListModule
  
  ]
})
export class SearchProductsModule { }
