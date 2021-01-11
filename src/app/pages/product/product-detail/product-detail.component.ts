import { Component, OnInit } from '@angular/core';
import { ProductBean } from 'src/app/Beans/ProductBean';
import { ProductDetailBean } from 'src/app/Beans/ProductDetailBean';
import { ProductService } from 'src/app/services/product.service';

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
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.product = new ProductBean();
  }

  public search(e: any) {
    this.productService.getProductsDetail({data: this.product})
      .subscribe(resp => {
        this.productList = resp.data;
        console.log(this.productList);
      });
    e.preventDefault();
  }


}
