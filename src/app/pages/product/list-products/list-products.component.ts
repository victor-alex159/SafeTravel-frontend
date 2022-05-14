import { Component, OnInit } from '@angular/core';
import { OrganizationBean } from 'src/app/Beans/OrganizationBean';
import { ProductBean } from 'src/app/Beans/ProductBean';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import swal from 'sweetalert2';
import * as FileSaver from 'file-saver';

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
    public authService: AuthService,    
    private sharedService: SharedService
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
      this.sharedService.sendOrRecieveData('/pc/gap', {}, true)
      .subscribe(resp => {
        this.productList = resp.datalist;
      });
    } else {
      this.sharedService.sendOrRecieveData('/pc/gpbup', {}, false)
      .subscribe((resp: any) => {
        if(resp.datalist != null) {
          this.productList = resp.datalist;
          this.sharedService.sendOrRecieveData('/oc/gobi', this.productList[0].organization, false)
            .subscribe(org => {
              this.organization.name = org.data.name;
            });
        }
      })
    }
  }

  public getOrganizationByUserPrincipal() {
    this.sharedService.sendOrRecieveData('/oc/gobup', {}, true)
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

  public deleteProduct(e: any) {
    let organizationSelected: OrganizationBean = e.data;
    this.selectedProduct = JSON.parse(JSON.stringify(organizationSelected));
    swal.fire({
      title: '¿Seguro de eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then(result => {
      if(result.isConfirmed) {
        this.sharedService.sendOrRecieveData('/pc/dp', this.selectedProduct, false)
          .subscribe(resp => {
            swal.fire(
              'Product eliminado correctamente!',
              '',
              'success'
            )
            this.getProducts();
          });
      }
    });
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

  public downloadExcel() {
    this.sharedService.getFile('/pc/grpe', {})
    .subscribe(resp => {
      FileSaver.saveAs(new Blob([resp], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), "reporte-productos.xlsx");
    })
  }
  

}
