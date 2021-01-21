import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevExtremeModule } from 'devextreme-angular';

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

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DevExtremeModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxFormModule,
    DxDataGridModule,
    DxTemplateModule,
    DxFileUploaderModule,
    DxGalleryModule,
    DxPopupModule,
    DxSpeedDialActionModule,
    DxListModule
  ]
})
export class DevextremeModule { }
