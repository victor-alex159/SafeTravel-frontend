import { Component, OnInit } from '@angular/core';
import { ProductBean } from 'src/app/Beans/ProductBean';
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

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.product = new ProductBean();
    this.getAllProducts();
  }

  public getAllProducts() {
    this.productService.getAllProducts({ })
      .subscribe((resp: any) => {
        this.productList = resp.datalist;
      });

  }

}
