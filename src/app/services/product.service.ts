import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { SharedService } from './shared.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  urlProduct: string = `${this.sharedService.url + '/pc'}`;
  urlProDetail: string = `${this.sharedService.url + '/pdc'}`;
  urlCommentary: string = `${this.sharedService.url + '/cmc'}`;
  private httpHeaders = new HttpHeaders( { 'Content-Type': 'application/json'
  } );

  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    private authService: AuthService
  ) { }

  private addAtuhorizationHeader() {
    let token = this.authService.token;
    if(token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  public saveProduct(product: any) {
    return this.http.post<any>(`${this.urlProduct + '/sp'}`, product, {headers: this.addAtuhorizationHeader()}); 
  }

  public loadFile(file: any, productId: number) {
    return this.http.post<any>(`${this.urlProduct + '/lf/' + productId}`, file); 
  }

  public getAllProducts(product: any) {
    return this.http.post<any>(`${this.urlProduct + '/gap'}`, product); 
  }

  public getProductsByUserPrincipal(product: any) {
    return this.http.post<any>(`${this.urlProduct + '/gpbup'}`, product, {headers: this.addAtuhorizationHeader()});
  }

  public saveProductDetail(productDetail: any) {
    return this.http.post<any>(`${this.urlProDetail + '/spd'}`, productDetail, {headers: this.addAtuhorizationHeader()}); 
  }

  public loadFileByProductDetail(file: any, productDetailId: number) {
    return this.http.post<any>(`${this.urlProDetail + '/lf/' + productDetailId}`, file); 
  }

  public getProductDetailByProductId(productDetail: any) {
    return this.http.post<any>(`${this.urlProDetail + '/gpdbi'}`, productDetail);
  }

  public getListProductsDetail(productDetail: any) {
    return this.http.post<any>(`${this.urlProDetail + '/gpd'}`, productDetail);
  }
  
  public getProductById(product: any) {
    return this.http.post<any>(`${this.urlProduct + '/gpbi'}`, product, {headers: this.addAtuhorizationHeader()});
  }

  public getProductByType(product: any) {
    return this.http.post<any>(`${this.urlProduct + '/gpbt'}`, product);
  }

  public saveCommentary(commentary: any) {
    return this.http.post<any>(`${this.urlCommentary + '/sc'}`, commentary, {headers: this.addAtuhorizationHeader()}); 
  }

  public getCommentaryByProductId(commentary: any) {
    return this.http.post<any>(`${this.urlCommentary + '/gcbpi'}`, commentary); 
  }

}
