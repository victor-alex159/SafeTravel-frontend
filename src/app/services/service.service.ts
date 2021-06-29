import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  url: string = `${this.sharedService.url + '/sc'}`;
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

  public saveService(service: any) {
    return this.http.post<any>(`${this.url + '/ss'}`, service, {headers: this.addAtuhorizationHeader()}); 
  }

  public getAllServices(service: any) {
    return this.http.post<any>(`${this.url + '/gas'}`, service, {headers: this.addAtuhorizationHeader()}); 
  }


  public getServiceById(service: any) {
    return this.http.post<any>(`${this.url + '/gsbi'}`, service, {headers: this.addAtuhorizationHeader()}); 
  }

}
