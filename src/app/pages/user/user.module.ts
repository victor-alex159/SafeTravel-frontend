import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
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
import { FormUserComponent } from './form-user/form-user.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [FormUserComponent, RecoverPasswordComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
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
export class UserModule { }
