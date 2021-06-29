import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { OrganizationBean } from '../../../.history/src/app/Beans/OrganizationBean_20201218012447';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationServiceService {

  url: string = `${this.sharedService.url + '/oc'}`;
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

  public saveOrganization(organization: any) {
    return this.http.post<any>(`${this.url + '/so'}`, organization, { headers: this.addAtuhorizationHeader() })
  }

  public getAllOrganization(organization: any) {
    return this.http.post<any>(`${this.url + '/gao'}`, organization, { headers: this.addAtuhorizationHeader() });
  }

  public getOrganizationByUserPrincipal(organization: any) {
    return this.http.post<any>(`${this.url + '/gobup'}`, organization, { headers: this.addAtuhorizationHeader() });
  }

  public getOrganizationById(organization: any) {
    return this.http.post<any>(`${this.url + '/gobi'}`, organization, { headers: this.addAtuhorizationHeader() });
  }

  public deleteOrganization(organization: any) {
    return this.http.post<any>(`${this.url + '/dobi'}`, organization, { headers: this.addAtuhorizationHeader() });
  }


}
