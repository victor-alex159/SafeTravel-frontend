import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private _loadingVisible: boolean = false;
  constructor() { }

  set loadingVisible(loadingVisible) {
    Promise.resolve(null).then(() => this._loadingVisible = loadingVisible);
  }

  get loadingVisible(): boolean {
    return this._loadingVisible;
  }


}
