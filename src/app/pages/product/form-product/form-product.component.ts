import { Component, Input, OnInit, Output, EventEmitter, enableProdMode } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { OrganizationBean } from 'src/app/Beans/OrganizationBean';
import { ProductBean } from 'src/app/Beans/ProductBean';
import { OrganizationServiceService } from 'src/app/services/organization-service.service';
import { ProductService } from 'src/app/services/product.service';
import swal from 'sweetalert2'
import { element } from 'protractor';

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
  @Output() closePopup: EventEmitter<string> = new EventEmitter<string>();
  image: string;
  imagenData: any;
  imagenEstado: boolean = false;
  selectedFiles: FileList;
  currentFileUpload: File;
  urlImageSelected: any;

  constructor(
    private productService: ProductService,
    private organizationService: OrganizationServiceService,
    private sanitization: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.product = new ProductBean();
    this.product.organization = new OrganizationBean();
    this.showPreview = false;
    if(this.productId) {
      this.getProduct(this.productId);
      this.productService.getImageById(this.productId)
        .subscribe(resp => {
          if ( resp.data) {
            this.getImage(resp.data);
          }
        });
    }
  }

  public hidePreview(event: any): void {
    this.showPreview = false;
  }

  /*public saveProduct(e: any) {
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
  }*/
  
  public saveProduct(e: any) {
    let productId: number;
    if(this.product != null || this.product != undefined) {
      if(this.selectedFiles != null) {
        this.currentFileUpload = this.selectedFiles.item(0);
      } else {
        this.currentFileUpload = new File( [''], 'None' );
      }
      this.productService.save(this.product, this.currentFileUpload)
      .subscribe(resp => {
        swal.fire(
          'Registrado correctamente!',
          'Con éxito!',
          'success'
        )
      });
      this.closePopup.emit("false");
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
    this.imagenEstado = false
  }

  
}
