import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  url: string = `${this.sharedService.url + '/cdc'}`;
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
  
  public getListCatalogDetailByCatalogId(catalogDetail: any) {
    return this.http.post<any>(`${this.url + '/glcdbci'}`, catalogDetail);
  }

}
