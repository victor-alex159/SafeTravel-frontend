import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { OrganizationBean } from '../../../.history/src/app/Beans/OrganizationBean_20201218012447';

@Injectable({
  providedIn: 'root'
})
export class OrganizationServiceService {

  url: string = 'http://localhost:8085/oc';
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

  public saveOrganization(organization: any) {
    return this.http.post<any>(`${this.url + '/so'}`, organization, { headers: this.addAtuhorizationHeader() })
  }

  public getAllOrganization(organization: any) {
    return this.http.post<any>(`${this.url + '/gao'}`, organization, { headers: this.addAtuhorizationHeader() });
  }


}
