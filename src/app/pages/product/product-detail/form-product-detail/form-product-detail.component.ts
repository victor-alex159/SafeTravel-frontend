import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  @Output() closePopup: EventEmitter<string> = new EventEmitter<string>();
  url: string = 'http://localhost:8085/pc';
  productDetail: ProductDetailBean;
  uploadFile: any[] = [];
  image: string;
  imagenData: any;
  imagenEstado: boolean = false;
  selectedFiles: FileList;
  currentFileUpload: File;
  urlImageSelected: any;

  constructor(
    private productService: ProductService,
    private sanitization: DomSanitizer
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
    if(this.selectedFiles != null) {
      this.currentFileUpload = this.selectedFiles.item(0);
    } else {
      this.currentFileUpload = new File( [''], 'None' );
    }
    this.productService.saveProductDetail(this.productDetail, this.currentFileUpload)
    .subscribe(resp => {
      swal.fire(
        'Registrado correctamente!',
        'Con éxito!',
        'success'
      )
    });
    this.closePopup.emit("false");
    e.preventDefault();
  }

  public getProductDetailByProductId(productId: number) {
    let productDetail = new ProductDetailBean();
    productDetail.product = new ProductBean();
    productDetail.product.id = productId;
    this.productService.getProductDetailByProductId({data: productDetail})
      .subscribe(resp => {
        this.productDetail = resp.data;
        this.productService.getImageProductDetailById(this.productDetail.id)
        .subscribe(resp => {
          if ( resp.data) {
            this.getImage(resp.data);
          }
        });
      });
  }

  getImage(base64: any){
    let objectURL = 'data:image/jpeg;base64,' + base64;
    this.imagenData = this.sanitization.bypassSecurityTrustResourceUrl(objectURL);
    this.imagenEstado = true;
  }

  selectImage( e: any ): void {
    this.image = e.target.files[0].name;
    this.selectedFiles = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload= (e)=> {
      this.urlImageSelected = e.target.result;
    };
    this.imagenEstado = false;
  }

}
