import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { ProductBean } from 'src/app/Beans/ProductBean';
import { ProductDetailBean } from 'src/app/Beans/ProductDetailBean';
import { ProductService } from 'src/app/services/product.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-form-product-detail',
  templateUrl: './form-product-detail.component.html',
  styleUrls: ['./form-product-detail.component.scss']
})
export class FormProductDetailComponent implements OnInit {
  @Input() productId: number;
  @Output() closePopup = new EventEmitter();
  url: string = 'http://localhost:8085/pc';
  productDetail: ProductDetailBean;
  uploadFile: any[] = [];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productDetail = new ProductDetailBean();
    if(this.productId) {
      this.getProductDetailByProductId(this.productId);
    }
  }

  public saveProductDetail(e: any) {
    this.productDetail.product = new ProductBean();
    this.productDetail.product.id = this.productId;
    console.log(this.productDetail);
    let productDetailId: number;
    this.productService.saveProductDetail({data: this.productDetail})
    .subscribe(resp => {
      productDetailId = resp.data.id;
      console.log(resp);
      const formData = new FormData();
      this.uploadFile.forEach((file, idx) => {
        formData.append('file', file);
      });
      this.productService.loadFileByProductDetail(formData, productDetailId).subscribe();
      swal.fire(
        'Registrado correctamente!',
        'Con éxito!',
        'success'
      )
    });
    e.preventDefault();
  }

  public getProductDetailByProductId(productId: number) {
    let productDetail = new ProductDetailBean();
    productDetail.product = new ProductBean();
    productDetail.product.id = productId;
    this.productService.getProductDetailByProductId({data: productDetail})
      .subscribe(resp => {
        this.productDetail = resp.data;
        console.log(this.productDetail);
      });
  }

}
