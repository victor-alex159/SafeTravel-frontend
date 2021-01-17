import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductBean } from 'src/app/Beans/ProductBean';
import { ProductService } from 'src/app/services/product.service';
import { gsap } from 'gsap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent implements OnInit {

  url: string = 'http://localhost:8085/pc';
  date_format:string = 'dd/MM/yyyy';
  START_DATE = new Date(1900, 0, 1);
  END_DATE = new Date(2060, 12, 31);
  productList: Array<any> = [];
  product: ProductBean;
  public nameProduct: any;

  constructor(
    public productService: ProductService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.product = new ProductBean();
    this.getAllProducts();
    //this.tween();
  }

  screen(width) {
    if (width < 768)
      return 'xs';

    if (width < 992)
      return 'sm';

    if (width < 1200)
      return 'md';

    return 'lg';
  }

  public getAllProducts() {
    this.productService.getAllProducts({ })
      .subscribe((resp: any) => {
        this.productList = resp.datalist;
      });

  }

  public sendNameProduct() {
    console.log(typeof this.nameProduct);
    this.router.navigate(['/gpd', this.nameProduct]);
  }

}
