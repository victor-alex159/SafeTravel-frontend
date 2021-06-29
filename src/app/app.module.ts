import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DevExtremeModule } from 'devextreme-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainComponent } from './shared/main/main.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
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
import { UserModule } from './pages/user/user.module';
import { SearchProductsModule } from './pages/search-products/search-products.module';
import { ProductModule } from './pages/product/product.module';
import { OrganizationModule } from './pages/organization/organization.module';
import { LoginModule } from './pages/login/login.module';
import { ServicesModule } from './pages/services/services.module';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LoginModule,
    OrganizationModule,
    ProductModule,
    SearchProductsModule,
    UserModule,
    ServicesModule,
    FontAwesomeModule,
    NgxPaginationModule,
    DevExtremeModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
