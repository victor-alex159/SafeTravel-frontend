import { Component, OnInit } from '@angular/core';
import { OrganizationBean } from 'src/app/Beans/OrganizationBean';
import { ProductBean } from 'src/app/Beans/ProductBean';
import { OrganizationServiceService } from 'src/app/services/organization-service.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  url: string = 'http://localhost:8085/pc';
  productList: Array<ProductBean> = [];
  product: ProductBean;
  selectedProduct: ProductBean = new ProductBean();
  organization: OrganizationBean;
  showPopupDetailForm: boolean = false;
  showPopupProductForm: boolean = false;
  showPopupProductFormEdit: boolean = false;
  productId: number;
  productName: string;

  constructor(
    private productService: ProductService,
    private organizationService: OrganizationServiceService
  ) { }

  ngOnInit(): void {
    this.product = new ProductBean();
    this.organization = new OrganizationBean();
    //this.selectedProduct = new ProductBean();
    this.getProductsByUserPrincipal();
    this.getOrganizationByUserPrincipal();
  }

  public getProductsByUserPrincipal() {
    this.productService.getProductsByUserPrincipal({})
      .subscribe((resp: any) => {
        this.productList = resp.datalist;
        console.log(this.productList);
      })
  }

  public getOrganizationByUserPrincipal() {
    this.organizationService.getOrganizationByUserPrincipal({})
      .subscribe(resp => {
        this.organization = resp.data;
      });
  }
  public showFormProduct() {
    this.selectedProduct = new ProductBean();
    this.showPopupProductForm = true;
  }

  public selectProduct(e:any) {
    let productSelected: ProductBean = e.data;
    this.selectedProduct = JSON.parse(JSON.stringify(productSelected));
    this.productName = this.selectedProduct.name;
    console.log(this.selectedProduct);
    this.showPopupDetailForm = true;
  }
  public selectProductEdit(e:any) {
    let productSelected: ProductBean = e.data;
    this.selectedProduct = JSON.parse(JSON.stringify(productSelected));
    this.productName = this.selectedProduct.name;
    this.showPopupProductFormEdit = true;
  }

  public onClosePopup(e: any) {
    if(this.showPopupProductForm) {
      this.showPopupProductForm=false;
    } else if(this.showPopupDetailForm) {
      this.showPopupDetailForm=false;
    } else if(this.showPopupProductFormEdit){
      this.showPopupProductFormEdit=false;
    }
  }

}
