import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = `${this.sharedService.url + '/uc'}`;
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

  public saveUser(user: any) {
    return this.http.post<any>(`${this.url + '/su'}`, user);

  }

  public getUserById(user: any) {
    return this.http.post<any>(`${this.url + '/gubi'}`, user, { headers: this.addAtuhorizationHeader() });
  }

}
