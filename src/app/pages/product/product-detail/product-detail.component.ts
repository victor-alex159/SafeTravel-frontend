import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductBean } from 'src/app/Beans/ProductBean';
import { ProductDetailBean } from 'src/app/Beans/ProductDetailBean';
import { ProductService } from 'src/app/services/product.service';
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
  constructor(
    private productService: ProductService,
    private router: Router,
    private sanitization: DomSanitizer,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.product = new ProductBean();
    this.nameProduct = this.route.snapshot.paramMap.get('name');
    if(this.nameProduct != '' && this.nameProduct != null) {
      this.searchProductDetailByName(this.nameProduct);
    }
  }

  public search(e: any) {
    this.productService.getAllProductsByNameAndDates({data: this.product})
      .subscribe(resp => {
        this.productList = resp.data;
        this.productList.forEach(pd => {
          let objectURL = 'data:image/jpeg;base64,' + pd.image;
          pd.imageFile = this.sanitization.bypassSecurityTrustResourceUrl(objectURL);
        });
        console.log(this.productList);
      });
      this.p = 1;
    e.preventDefault();
  }

  public searchProductDetailByName(name: string) {
    let product = new ProductBean();
    console.log(name);
    product.name = name;
    this.productService.getAllProductsByNameAndDates({data: product})
      .subscribe(resp => {
        this.productList = resp.data;
        this.productList.forEach(pd => {
          let objectURL = 'data:image/jpeg;base64,' + pd.image;
          pd.imageFile = this.sanitization.bypassSecurityTrustResourceUrl(objectURL);
        });
        console.log(this.productList);
      });
      this.nameProduct = '';
  }

  public getProductId(productId: any) {
    this.router.navigate(['/pr/icp', productId]);
  }


}
