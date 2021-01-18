import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string = 'http://localhost:8085/pc';
  urlProDetail: string = 'http://localhost:8085/pdc';
  urlCommentary: string = 'http://localhost:8085/cmc';
  private httpHeaders = new HttpHeaders( { 'Content-Type': 'application/json'
  } );

  constructor(
    private http: HttpClient,
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
    return this.http.post<any>(`${this.url + '/sp'}`, product, {headers: this.addAtuhorizationHeader()}); 
  }

  public loadFile(file: any, productId: number) {
    return this.http.post<any>(`${this.url + '/lf/' + productId}`, file); 
  }

  public getAllProducts(product: any) {
    return this.http.post<any>(`${this.url + '/gap'}`, product); 
  }

  public getProductsByUserPrincipal(product: any) {
    return this.http.post<any>(`${this.url + '/gpbup'}`, product, {headers: this.addAtuhorizationHeader()});
  }

  public saveProductDetail(productDetail: any) {
    return this.http.post<any>(`${this.urlProDetail + '/spd'}`, productDetail, {headers: this.addAtuhorizationHeader()}); 
  }

  public loadFileByProductDetail(file: any, productDetailId: number) {
    return this.http.post<any>(`${this.urlProDetail + '/lf/' + productDetailId}`, file); 
  }

  public getProductDetailByProductId(productDetail: any) {
    return this.http.post<any>(`${this.urlProDetail + '/gpdbi'}`, productDetail, {headers: this.addAtuhorizationHeader()});
  }

  public getListProductsDetail(productDetail: any) {
    return this.http.post<any>(`${this.urlProDetail + '/gpd'}`, productDetail, {headers: this.addAtuhorizationHeader()});
  }
  
  public getProductById(product: any) {
    return this.http.post<any>(`${this.url + '/gpbi'}`, product, {headers: this.addAtuhorizationHeader()});
  }

  public getProductByType(product: any) {
    return this.http.post<any>(`${this.url + '/gpbt'}`, product);
  }

  public saveCommentary(commentary: any) {
    return this.http.post<any>(`${this.urlCommentary + '/sc'}`, commentary, {headers: this.addAtuhorizationHeader()}); 
  }

  public getCommentaryByProductId(commentary: any) {
    return this.http.post<any>(`${this.urlCommentary + '/gcbpi'}`, commentary, {headers: this.addAtuhorizationHeader()}); 
  }

}
