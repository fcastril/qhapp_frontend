import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginModel } from '../models/login.model';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = ''

  constructor(private common: CommonService,
              private http: HttpClient ) {
    this.url = common.getUrl();
  }

  login( user: LoginModel)
  {
    const authData = {
      username: user.login,
      password: user.password
    }

    return this.http.post(`${ this.url }token`, authData)
      .pipe(
        map( (resp: any) => {
          if (resp.response)
          {
            localStorage.setItem('isLoggedin', 'true');
            localStorage.setItem('token', resp.result.token);
            localStorage.setItem('login', resp.result.login);
            localStorage.setItem('userName', resp.result.userName);
            localStorage.setItem('expires', resp.result.expires);
            localStorage.setItem('idUserLogin', resp.result.idUser);
            localStorage.setItem('idProfile', resp.result.idProfile);
         }
         else {
          Swal.fire(
            {
              title: 'Error',
              text: 'Error en el usuario y/o la contraseña',
              icon: 'error'
            }
          );
         }
          return resp;
        })
      );
  }

  loggout()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    localStorage.removeItem('idUserLogin');
    localStorage.removeItem('userName');
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('idProfile');
    localStorage.removeItem('expires');
    localStorage.removeItem('isExternal');
  }

  isLoggedin(){
    let resp = false;
    if (localStorage.getItem('isLoggedin')==='true')
    {

      let stringDateExpire = localStorage.getItem('expires')??'';
      let DateExpire = new Date(stringDateExpire);
      if (DateExpire <= new Date())
      {
        resp = false;
      }
      else
      {
        resp = true;
      }
    }
    return resp;
  }

  getToken(): string {
    let token = '';
    if (this.isLoggedin())
    {
     token = localStorage.getItem('token')??'';
    }
    return token;
  }

  getHeaders(){
    return new HttpHeaders({Authorization: `Bearer ${this.getToken()}`});
  }
}
