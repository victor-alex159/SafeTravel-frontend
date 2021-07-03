import { Component, Input, OnInit, Output, EventEmitter, enableProdMode } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { OrganizationBean } from 'src/app/Beans/OrganizationBean';
import { ProductBean } from 'src/app/Beans/ProductBean';
import { OrganizationServiceService } from 'src/app/services/organization-service.service';
import { ProductService } from 'src/app/services/product.service';
import swal from 'sweetalert2'
import { element } from 'protractor';
import { AuthService } from 'src/app/services/auth.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { CatalogDetailBean } from 'src/app/Beans/CatalogDetailBean';
import { CatalogBean } from 'src/app/Beans/CatalogBean';
import { CatalogService } from 'src/app/services/catalog.service';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { ServiceBean } from 'src/app/Beans/ServiceBean';

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
  isTypeHotel: boolean = false;
  isTypeRestaurant: boolean = false;
  isTypeMuseo: boolean = false;
  typeProduct: any = [
    {name: 'Hotel'},
    {name: 'Restaurante'}
    
  ];
  catalogDetailBean: CatalogDetailBean;
  listCatalogDetail: Array<CatalogDetailBean> = [];
  catalogDetailCheck: boolean = false;
  listServices: Array<ServiceBean> = [];
  listServiceSelected: Array<any> = [];
  selectedKeys: Array<any> = [];
  disableEdit: boolean = false;

  constructor(
    private productService: ProductService,
    private organizationService: OrganizationServiceService,
    private sanitization: DomSanitizer,
    public authService: AuthService,
    public constantService: ConstantsService,
    private catalogService: CatalogService,
    private serviceService: ServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listServiceSelected = [];
    this.product = new ProductBean();
    this.product.organization = new OrganizationBean();
    this.showPreview = false;
    this.getAllServices();
    if(this.authService.hasRole('Administrador')) {
      this.disableEdit = true;
    }
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
    if(this.product != null || this.product != undefined) {
      if(this.selectedFiles != null) {
        this.currentFileUpload = this.selectedFiles.item(0);
      } else {
        this.currentFileUpload = new File( [''], 'None' );
      }
      if(this.listServiceSelected.length>0) {
        let servicesCodes = '';
        this.listServiceSelected.forEach(service => {
          servicesCodes = servicesCodes + service.code.concat(',');
        });
        this.product.serviceId = servicesCodes.substring(0, servicesCodes.length-1);
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
    this.listServiceSelected = [];
    this.productService.getProductById({data: productBean})
    .subscribe(resp => {
      this.product = resp.data;
      //this.selecTypeProduct(this.product.type);
      this.product.imagePath = resp.data.imagePath;
      if(this.product.serviceId != null) {
        let listServiceCodes = this.product.serviceId.split(',');
        this.listServices.forEach(service => {
          for(let code of listServiceCodes) {
            if(service.code == code) {
              this.listServiceSelected.push(service);
            }
          }
        });
      }
      //this.product = resp.data.id;
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

  public selecTypeProduct(e: any) {
    let typeProduct = '';
    if(typeof e === 'string') {
      typeProduct = e;
    } else {
      typeProduct = e.value;
    }
    switch(typeProduct) {
      case this.constantService.TYPE_PRODUCT_HOTEL: {
        this.isTypeHotel = true;
        this.isTypeRestaurant = false;
        break;
      }
      case this.constantService.TYPE_PRODUCT_RESTAURANT: {
        this.isTypeRestaurant = true;
        this.isTypeHotel = false;
        break;
      }
    }

  }

  public getAllServices() {
    let service = new ServiceBean();
    this.serviceService.getAllServices({data: service}).subscribe(resp => {
      this.listServices = resp.datalist;
    });
  }  
}
