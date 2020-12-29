import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DevExtremeModule } from 'devextreme-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MainComponent } from './shared/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';

import { DxCheckBoxModule,
         DxSelectBoxModule,
         DxNumberBoxModule,
         DxDataGridModule,
         DxFormModule,
         DxTemplateModule,
         DxFileUploaderModule,
         DxGalleryModule
         } from 'devextreme-angular';
import { SearchProductsComponent } from './pages/search-products/search-products.component';
import { FormOrganizationComponent } from './pages/organization/form-organization/form-organization.component';
import { OrganizationListComponent } from './pages/organization/organization-list/organization-list.component';
import { FormProductComponent } from './pages/product/form-product/form-product.component';
import { FormUserComponent } from './pages/user/form-user/form-user.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListProductsComponent } from './pages/product/list-products/list-products.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    FooterComponent,
    MainComponent,
    LoginComponent,
    SearchProductsComponent,
    FormOrganizationComponent,
    OrganizationListComponent,
    FormProductComponent,
    FormUserComponent,
    ListProductsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    DevExtremeModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxFormModule,
    DxDataGridModule,
    DxTemplateModule,
    DxFileUploaderModule,
    DxGalleryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
