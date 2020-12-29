import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserBean } from '../Beans/UserBean';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: UserBean;
  private _token: string;

  credentials = btoa('tallerProject' + ':' + 'taller');

  urlEndpoint: string = 'http://localhost:8085/oauth/token';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + this.credentials
  });

  constructor(
    private http: HttpClient
  ) { }

  public login(user: UserBean): Observable<any> {
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.username);
    params.set('password', user.password);
  
    return this.http.post<any>(this.urlEndpoint, params.toString(), {headers: this.httpHeaders});
    
  }

  public saveUser(accessToken: string): void {
    let payload = this.getDateToken(accessToken);
    this._user = new UserBean();
    this._user.username = payload.user_name;
    this._user.position = payload.authorities[0];
    sessionStorage.setItem('user', JSON.stringify(this._user));
  }

  public saveToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  public getDateToken(accessToken: string): any {
    if(accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  public get token() {
    if(this._token != null) {
      return this._token;
    } else if(this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }
  
}
