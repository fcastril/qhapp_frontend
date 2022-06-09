import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

 private url = environment.urlAPI

  constructor() { }

  getUrl(): string {
    return this.url;
  }
}
