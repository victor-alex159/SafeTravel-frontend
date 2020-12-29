import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string = 'http://localhost:8085/pc';
  private httpHeaders = new HttpHeaders( { 'Content-Type': 'multipart/form-data'
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
    return this.http.post<any>(`${this.url + '/sp'}`, product); 
  }

  public loadFile(file: any, productId: number) {
    return this.http.post<any>(`${this.url + '/lf/' + productId}`, file); 
  }

  public getAllProducts(product: any) {
    return this.http.post<any>(`${this.url + '/gap'}`, product); 
  }

}
