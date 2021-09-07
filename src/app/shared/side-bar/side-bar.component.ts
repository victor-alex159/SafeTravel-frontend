import { Component, OnInit } from '@angular/core';
import { CatalogBean } from 'src/app/Beans/CatalogBean';
import { CatalogDetailBean } from 'src/app/Beans/CatalogDetailBean';
import { ServiceBean } from 'src/app/Beans/ServiceBean';
import { AuthService } from 'src/app/services/auth.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  listCatalogDetail: Array<CatalogDetailBean> = [];
  catalogDetailCheck: boolean = false;
  catalogDetailBean: CatalogDetailBean;
  listServices: Array<ServiceBean> = [];
  listServiceSelected: Array<any> = [];

  constructor(
    public authService: AuthService,
    private constantService: ConstantsService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.catalogDetailBean = new CatalogDetailBean();
    this.getAllServices();
  }

  public getAllServices() {
    let service = new ServiceBean();
    this.sharedService.sendOrRecieveData('/sc/gas', service, true)
    .subscribe(resp => {
      this.listServices = resp.datalist;
    });
  }

  public getListCatalogByCatalogId() {
    this.catalogDetailBean.catalog = new CatalogBean();
    this.catalogDetailBean.catalog.id = this.constantService.TYPE_SERVICES_HOTEL;
    this.sharedService.sendOrRecieveData('/cdc/glcdbci', this.catalogDetailBean, true)
      .subscribe(resp => {
        this.listCatalogDetail = resp.datalist;
      });
  }

}
