import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProductBean } from 'src/app/Beans/ProductBean';
import { ConstantsService } from 'src/app/services/constants.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-list-hotel',
  templateUrl: './list-hotel.component.html',
  styleUrls: ['./list-hotel.component.scss']
})
export class ListHotelComponent implements OnInit {
  listHotels: Array<ProductBean> = [];
  public nameProduct: any;
  
  constructor(
    private constanService: ConstantsService,
    private sanitization: DomSanitizer,
    public router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.getProductByHotel();
  }

  public getProductByHotel() {
    let product = new ProductBean();
    product.type = this.constanService.TYPE_PRODUCT_HOTEL;
    this.sharedService.sendOrRecieveData('/pc/gpbt', product, true)
      .subscribe(list => {
        this.listHotels = list.datalist;
        this.listHotels.forEach(pd => {
          let objectURL = 'data:image/jpeg;base64,' + pd.image;
          pd.imageFile = this.sanitization.bypassSecurityTrustResourceUrl(objectURL);
        });
      });
  }

  public sendNameProduct(e: any) {
    if(this.nameProduct != '') {
      this.router.navigate(['/pr/gpd', this.nameProduct]);
    }
    e.preventDefault();
  }

  public getProductId(productId: number) {
    this.router.navigate(['/pr/icp', productId]);
  }
}
