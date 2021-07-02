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
  private httpHeadersToFile = new HttpHeaders();
  private httpHeaders = new HttpHeaders( { 'Content-Type': 'application/json'} );
  

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

  private addAtuhorizationHeaderToFile() {
    let token = this.authService.token;
    let httpHeadersToFile = new HttpHeaders();
    if(token != null) {
      return httpHeadersToFile.append('Authorization', 'Bearer ' + token);
    }
    return httpHeadersToFile;
  }

  public saveProduct(product: any) {
    return this.http.post<any>(`${this.urlProduct + '/sp'}`, product, {headers: this.addAtuhorizationHeader()}); 
  }

  public deleteProduct(product: any) {
    return this.http.post<any>(`${this.urlProduct + '/dp'}`, product, {headers: this.addAtuhorizationHeader()}); 
  }

  public loadFile(file: any, productId: number) {
    return this.http.post<any>(`${this.urlProduct + '/lf/' + productId}`, file); 
  }

  public getAllProducts(product: any) {
    return this.http.post<any>(`${this.urlProduct + '/gap'}`, product); 
  }
  
  public getAllProductsByNameAndDates(product: any) {
    return this.http.post<any>(`${this.urlProduct + '/gpbnad'}`, product); 
  }

  public getProductsByUserPrincipal(product: any) {
    return this.http.post<any>(`${this.urlProduct + '/gpbup'}`, product, {headers: this.addAtuhorizationHeader()});
  }

  /*public saveProductDetail(productDetail: any) {
    return this.http.post<any>(`${this.urlProDetail + '/spd'}`, productDetail, {headers: this.addAtuhorizationHeaderToFile()}); 
  }*/

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

  public save(productBean: any, file?: File) {
    let formData = new FormData();
    formData.append('file', file);
    const productBlob = new Blob([JSON.stringify(productBean)], { type: 'application/json' });
    formData.append('product', productBlob);
    return this.http.post<any>(`${this.urlProduct + '/sv'}`, formData, {headers: this.addAtuhorizationHeaderToFile()});
  }
  public saveProductDetail(productDetailBean: any, file?: File) {
    let formData = new FormData();
    formData.append('file', file);
    const productDetailBlob = new Blob([JSON.stringify(productDetailBean)], { type: 'application/json' });
    formData.append('productDetail', productDetailBlob);
    return this.http.post<any>(`${this.urlProDetail + '/spd'}`, formData, {headers: this.addAtuhorizationHeaderToFile()});
  }

  public getImageById(productId: number) {
    return this.http.post<any>(`${this.urlProduct + '/gi/' + productId}`, {
      responseType: 'blob'
    });
  }

  public getImageProductDetailById(producDetailtId: number) {
    return this.http.post<any>(`${this.urlProDetail + '/gi/' + producDetailtId}`, {
      responseType: 'blob'
    });
  }

}
