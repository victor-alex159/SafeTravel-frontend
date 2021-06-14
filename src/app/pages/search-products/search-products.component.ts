import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductBean } from 'src/app/Beans/ProductBean';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ConstantsService } from 'src/app/services/constants.service';
import { constants } from 'buffer';

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
  listHotels: Array<any> = [];
  listRestaurants: Array<any> = [];
  product: ProductBean;
  public nameProduct: any;
  image: string;
  imagenData: any;
  imagenEstado: boolean = false;

  constructor(
    public productService: ProductService,
    public constantsService: ConstantsService,
    public router: Router,
    private sanitization: DomSanitizer,
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
    let product = new ProductBean();
    let listProducts: Array<any> = [];
    let contHotels = 0;
    let contRestaurants = 0;
    this.productService.getAllProducts({})
      .subscribe((resp: any) => {
        listProducts = resp.datalist;
        listProducts.forEach(prod => {
          if(this.constantsService.TYPE_PRODUCT_HOTEL == prod.type) {
            if(contHotels < 4) {
              this.listHotels.push(prod);
              contHotels++;
            }
          }
          if(this.constantsService.TYPE_PRODUCT_RESTAURANT == prod.type) {
            if(contRestaurants < 4) {
              this.listRestaurants.push(prod);
              contRestaurants++;
            }
          }
        });
        
        /*
        let cont = 0;
        let indexProduct = 0;
        //let elementProduct = 0;
        let found: boolean = false;
        //while(cont < 4) {
          console.log(indexProduct);
          let dt = function() {
            let elementProduct = Math.floor(Math.random()*resp.datalist.length);
            console.log(elementProduct);
            if(elementProduct != indexProduct) {
              this.productList.push(resp.datalist[elementProduct]);
              indexProduct = elementProduct;
              found = true;
              cont++;
            } else {
              dt();
            }
          }
        //}*/
          this.listHotels.forEach(product => {
              let objectURL = 'data:image/jpeg;base64,' + product.image;
              product.imageFile = this.sanitization.bypassSecurityTrustResourceUrl(objectURL);
          });
          this.listRestaurants.forEach(product => {
              let objectURL = 'data:image/jpeg;base64,' + product.image;
              product.imageFile = this.sanitization.bypassSecurityTrustResourceUrl(objectURL);
          });
      });

  }
  

  public sendNameProduct(e: any) {
    if(this.nameProduct != '') {
      this.router.navigate(['/pr/gpd', this.nameProduct]);
    }
    e.preventDefault();
  }

}
