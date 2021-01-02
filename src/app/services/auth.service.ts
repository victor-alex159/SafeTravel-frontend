import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientBean } from '../Beans/Client';
import { UserBean } from '../Beans/UserBean';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: any;
  private _token: string;

  credentials = btoa('tallerProject' + ':' + 'taller');

  urlEndpoint: string = 'http://localhost:8085/oauth/token';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + this.credentials
  });

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public login(user: any): Observable<any> {
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.username);
    params.set('password', user.password);
  
    return this.http.post<any>(this.urlEndpoint, params.toString(), {headers: this.httpHeaders});
    
  }

  public logout() {
    this._token = null;
    this._user = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }

  public saveUser(accessToken: string): void {
    let payload = this.getDateToken(accessToken);
    this._user = new ClientBean();
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

  public get user() {
    if(this._user != null) {
      return this._user;
    } else if(this._user == null && sessionStorage.getItem('user') != null) {
      this._user = JSON.parse(sessionStorage.getItem('user')) as ClientBean;
      return this._user;
    }
    return new ClientBean();
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

  public isAthenticated(): boolean {
    let getToken = this.getDateToken(this.token);
    if(getToken != null && getToken.user_name && getToken.user_name.length > 0) {
      return true;
    }
    return false;
  }

  private isNoAuthorized(e): boolean {
    if(e.status == 401 || e.status == 403) {
      this.router.navigate(['/sps']);
      return true;
    }
    return false;
  }

  public hasRole(position: string): boolean {
    if(this.user.position == position && this.user.position != '') {
      return true;
    }
    return false;
  }
  
}
