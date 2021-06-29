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

  private addAtuhorizationHeaderToFile() {
    let token = this.authService.token;
    let httpHeadersToFile = new HttpHeaders();
    if(token != null) {
      return httpHeadersToFile.append('Authorization', 'Bearer ' + token);
    }
    return httpHeadersToFile;
  }

  public saveUser(user: any) {
    return this.http.post<any>(`${this.url + '/su'}`, user);

  }

  public getUserById(user: any) {
    return this.http.post<any>(`${this.url + '/gubi'}`, user, { headers: this.addAtuhorizationHeader() });
  }

  public getAllUsers(user: any) {
    return this.http.post<any>(`${this.url + '/gau'}`, user, { headers: this.addAtuhorizationHeader() });
  }

  public recoverPassword(user: any) {
    return this.http.post<any>(`${this.url + '/scvfp'}`, user);
  }

  public changePassword(user: any) {
    return this.http.post<any>(`${this.url + '/cp/'}`, user);
  }

  public changePasswordWithTokenPassword(user: any, tokenResetPassword: string) {
    return this.http.post<any>(`${this.url + '/cpwt/' + tokenResetPassword}`, user);
  }
  
  public getUserByUserSession(user: any) {
    return this.http.post<any>(`${this.url + '/gubus/'}`, user,{ headers: this.addAtuhorizationHeader() });
  }

  public savePhoto(userBean: any, file?: File) {
    let formData = new FormData();
    formData.append('file', file);
    const userBlob = new Blob([JSON.stringify(userBean)], { type: 'application/json' });
    formData.append('userPhoto', userBlob);
    return this.http.post<any>(`${this.url + '/sp'}`, formData, {headers: this.addAtuhorizationHeaderToFile()});
  }

  public getImageById(userId: number) {
    return this.http.post<any>(`${this.url + '/gi/' + userId}`, {
      responseType: 'blob'
    });
  }

}
