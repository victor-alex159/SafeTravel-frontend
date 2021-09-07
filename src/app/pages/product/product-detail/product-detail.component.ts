import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductBean } from 'src/app/Beans/ProductBean';
import { ProductDetailBean } from 'src/app/Beans/ProductDetailBean';
import { ServiceBean } from 'src/app/Beans/ServiceBean';
import { SharedService } from 'src/app/services/shared.service';
import { SearchProductsComponent } from '../../search-products/search-products.component';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  url: string = 'http://localhost:8085/pdc';
  date_format:string = 'dd/MM/yyyy';
  START_DATE = new Date(1900, 0, 1);
  END_DATE = new Date(2060, 12, 31);
  product: ProductBean;
  productList: Array<any> = [];
  nameProduct: string = '';
  p: number = 1;
  imagenData: any;
  listServices: Array<ServiceBean> = [];
  listServiceSelected: Array<any> = [];

  constructor(
    private router: Router,
    private sanitization: DomSanitizer,
    private route: ActivatedRoute,
    private sharedService: SharedService

  ) { }

  ngOnInit(): void {
    this.product = new ProductBean();
    this.getAllServices();
    this.nameProduct = this.route.snapshot.paramMap.get('name');
    if(this.nameProduct != '' && this.nameProduct != null) {
      this.searchProductDetailByName(this.nameProduct);
    }
  }

  public getAllServices() {
    let service = new ServiceBean();
    this.sharedService.sendOrRecieveData('/sc/gas', service, false)
    .subscribe(resp => {
      this.listServices = resp.datalist;
    });
  }

  public search(e: any) {
    if(this.listServiceSelected.length>0) {
      let servicesCodes = '';
      this.listServiceSelected.forEach(service => {
        servicesCodes = servicesCodes + service.code.concat(',');
      });
      this.product.serviceId = servicesCodes.substring(0, servicesCodes.length-1);
    }
    this.sharedService.sendOrRecieveData('/pc/gpbnad', this.product, true)
      .subscribe(resp => {
        this.productList = resp.data;
        this.productList.forEach(pd => {
          let objectURL = 'data:image/jpeg;base64,' + pd.image;
          pd.imageFile = this.sanitization.bypassSecurityTrustResourceUrl(objectURL);
        });
      });
      this.product.serviceId = '';
      this.p = 1;
    e.preventDefault();
  }

  public searchProductDetailByName(name: string) {
    let product = new ProductBean();
    console.log(name);
    product.name = name;
    this.sharedService.sendOrRecieveData('/pc/gpbnad', product, true)
      .subscribe(resp => {
        this.productList = resp.data;
        this.productList.forEach(pd => {
          let objectURL = 'data:image/jpeg;base64,' + pd.image;
          pd.imageFile = this.sanitization.bypassSecurityTrustResourceUrl(objectURL);
        });
      });
      this.nameProduct = '';
  }

  public getProductId(productId: any) {
    this.router.navigate(['/pr/icp', productId]);
  }


}
