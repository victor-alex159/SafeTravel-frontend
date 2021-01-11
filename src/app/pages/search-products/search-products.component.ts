import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductBean } from 'src/app/Beans/ProductBean';
import { ProductService } from 'src/app/services/product.service';
import { gsap } from 'gsap';

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
  images: any[] = [
    {
      src : '../../../assets/image/hotel1.jpg'
    },
    {
      src : '../../../assets/image/hotel2.jpg'
    },
    {
      src : '../../../assets/image/museo1.jpg'
    }
  ];

  constructor(
    private productService: ProductService
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

  public tween() {
    gsap.from(".products", {duration: 2, x: 300});
  }

}
