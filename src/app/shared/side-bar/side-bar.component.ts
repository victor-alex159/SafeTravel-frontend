import { Component, OnInit } from '@angular/core';
import { CatalogBean } from 'src/app/Beans/CatalogBean';
import { CatalogDetailBean } from 'src/app/Beans/CatalogDetailBean';
import { ServiceBean } from 'src/app/Beans/ServiceBean';
import { AuthService } from 'src/app/services/auth.service';
import { CatalogService } from 'src/app/services/catalog.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { ServiceService } from 'src/app/services/service.service';

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
    private catalogService: CatalogService,
    private serviceService: ServiceService,
    private constantService: ConstantsService
  ) { }

  ngOnInit(): void {
    this.catalogDetailBean = new CatalogDetailBean();
    this.getAllServices();
  }

  public getAllServices() {
    let service = new ServiceBean();
    this.serviceService.getAllServices({data: service}).subscribe(resp => {
      this.listServices = resp.datalist;
      console.log(this.listServices)
    });
  }

  public getListCatalogByCatalogId() {
    this.catalogDetailBean.catalog = new CatalogBean();
    this.catalogDetailBean.catalog.id = this.constantService.TYPE_SERVICES_HOTEL;
    this.catalogService.getListCatalogDetailByCatalogId({data: this.catalogDetailBean})
      .subscribe(resp => {
        this.listCatalogDetail = resp.datalist;
      });
  }

}
