import { Component, OnInit } from '@angular/core';
import { OrganizationBean } from 'src/app/Beans/OrganizationBean';
import { ProductBean } from 'src/app/Beans/ProductBean';
import { ProductService } from 'src/app/services/product.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  product: ProductBean;
  uploadFile: any[] = [];
  showPreview: boolean = false;
  url: string = 'http://localhost:8085/pc';

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.product = new ProductBean();
    this.showPreview = false;
  }

  public hidePreview(event: any): void {
    this.showPreview = false;
  }

  public saveProduct(e: any) {
    let organization = new OrganizationBean();
    let productId: number;
    this.product.organization = organization;
    this.product.organization.id = 1;
    this.productService.saveProduct({data: this.product})
    .subscribe(resp => {
      productId = resp.data.id;
      console.log(resp);
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
    e.preventDefault();
  }

}
