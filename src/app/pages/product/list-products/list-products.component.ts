import { Component, OnInit } from '@angular/core';
import { OrganizationBean } from 'src/app/Beans/OrganizationBean';
import { ProductBean } from 'src/app/Beans/ProductBean';
import { AuthService } from 'src/app/services/auth.service';
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
    private organizationService: OrganizationServiceService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.product = new ProductBean();
    this.organization = new OrganizationBean();
    //this.selectedProduct = new ProductBean();
    this.getProducts();
  }

  /* public getProductsByUserPrincipal() {
    this.productService.getProductsByUserPrincipal({})
      .subscribe((resp: any) => {
        this.productList = resp.datalist;
        console.log(this.productList);
      })
  } */


  public getProducts() {
    if(this.authService.hasRole('Administrador')) {
      this.productService.getAllProducts({}).subscribe(resp => {
        this.productList = resp.datalist;
      });
    } else {
      this.productService.getProductsByUserPrincipal({})
      .subscribe((resp: any) => {
        if(resp.datalist != null) {
          this.productList = resp.datalist;
          this.organizationService.getOrganizationById({data: this.productList[0].organization})
            .subscribe(org => {
              this.organization.name = org.data.name;
            });
        }
      })
    }
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
    this.showPopupDetailForm = true;
  }
  public selectProductEdit(e:any) {
    let productSelected: ProductBean = e.data;
    this.selectedProduct = JSON.parse(JSON.stringify(productSelected));
    this.productName = this.selectedProduct.name;
    this.showPopupProductFormEdit = true;
  }

  public onClosePopupForm(e: any) {
    if(e == 'false') {
      this.showPopupProductForm = false
      setTimeout(() => {
        this.getProducts();
      }, 1500);
    }
  }
  public onClosePopupFormEdit(e: any) {
    if(e == 'false') {
      this.showPopupProductFormEdit = false
      setTimeout(() => {
        this.getProducts();
      }, 1500);
    }
  }
  public onClosePopupFormEditDetail(e: any) {
    if(e == 'false') {
      this.showPopupDetailForm = false
      setTimeout(() => {
        this.getProducts();
      }, 1500);
    }
  }
  

}
