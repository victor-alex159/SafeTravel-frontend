import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  //public url: string = 'http://localhost:8085';
  public url: string = 'https://safetravelpe.herokuapp.com';

  private _loadingVisible: boolean = false;
  constructor() { }

  set loadingVisible(loadingVisible) {
    Promise.resolve(null).then(() => this._loadingVisible = loadingVisible);
  }

  get loadingVisible(): boolean {
    return this._loadingVisible;
  }


}
