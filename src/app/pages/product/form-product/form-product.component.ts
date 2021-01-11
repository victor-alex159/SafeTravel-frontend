import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { OrganizationBean } from 'src/app/Beans/OrganizationBean';
import { ProductBean } from 'src/app/Beans/ProductBean';
import { OrganizationServiceService } from 'src/app/services/organization-service.service';
import { ProductService } from 'src/app/services/product.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  product: ProductBean;
  organizationList: Array<OrganizationBean> = [];
  uploadFile: any[] = [];
  showPreview: boolean = false;
  url: string = 'http://localhost:8085/pc';
  date_format:string = 'dd/MM/yyyy';
  START_DATE = new Date(1900, 0, 1);
  END_DATE = new Date(2060, 12, 31);
  @Input() productId: number;
  @Output() closePopup = new EventEmitter();

  constructor(
    private productService: ProductService,
    private organizationService: OrganizationServiceService
  ) { }

  ngOnInit(): void {
    this.product = new ProductBean();
    this.product.organization = new OrganizationBean();
    this.showPreview = false;
    if(this.productId) {
      this.getProduct(this.productId);
    }
  }

  public hidePreview(event: any): void {
    this.showPreview = false;
  }

  public saveProduct(e: any) {
    let productId: number;
    if(this.product != null || this.product != undefined) {
      this.productService.saveProduct({data: this.product})
      .subscribe(resp => {
        productId = resp.data.id;
        const formData = new FormData();
        this.uploadFile.forEach((file, idx) => {
          formData.append('file', file);
        });
        this.productService.loadFile(formData, productId).subscribe();
        this.showPreview = true;
        swal.fire(
          'Registrado correctamente!',
          'Con éxito!',
          'success'
        )
      });
    }
    e.preventDefault();
  }

  public getProduct(productId: number) {
    let productBean = new ProductBean();
    productBean.id = productId;
    this.productService.getProductById({data: productBean})
    .subscribe(resp => {
      console.log(resp.data);
      this.product = resp.data;
      this.product.imagePath = resp.data.imagePath;
      //this.product = resp.data.id;
      console.log(this.product);
    });
  }
  
}
