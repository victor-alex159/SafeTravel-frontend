import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ListServicesComponent } from './list-services/list-services.component';
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
  DxListModule,
  DxButtonModule,
  DevExtremeModule
  } from 'devextreme-angular';
import { FormServiceComponent } from './form-service/form-service.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DxoContextToolboxModule } from 'devextreme-angular/ui/nested';

@NgModule({
  declarations: [FormServiceComponent, ListServicesComponent],
  imports: [
    CommonModule,
    ServicesRoutingModule,
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
    DxoContextToolboxModule
  ]
})
export class ServicesModule { }
