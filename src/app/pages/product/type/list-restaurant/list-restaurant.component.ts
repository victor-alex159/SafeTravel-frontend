import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductBean } from 'src/app/Beans/ProductBean';
import { ConstantsService } from 'src/app/services/constants.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-restaurant',
  templateUrl: './list-restaurant.component.html',
  styleUrls: ['./list-restaurant.component.scss']
})
export class ListRestaurantComponent implements OnInit {

  url: string = 'http://localhost:8085/pc';
  listRestaurant: Array<ProductBean> = [];
  public nameProduct: any;

  constructor(
    private constanService: ConstantsService,
    private productService: ProductService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getProductByRestaurant();
  }

  public getProductByRestaurant() {
    let product = new ProductBean();
    product.type = this.constanService.TYPE_PRODUCT_RESTAURANT;
    this.productService.getProductByType({data: product})
      .subscribe(list => {
        this.listRestaurant = list.datalist;
      });
  }

  public sendNameProduct() {
    console.log(typeof this.nameProduct);
    this.router.navigate(['/pr/gpd', this.nameProduct]);
  }

}
