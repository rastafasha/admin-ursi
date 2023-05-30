import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Orlando } from '../models/orlando';
const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class OrlandoService {

  public eventoorlando: Orlando;

  info:any = {};
  cargada:boolean = false;


  constructor(private http: HttpClient) { }

  get token():string{
    return localStorage.getItem('auth_token') || '';
  }


  get headers(){
    return{
      headers: {
        'auth_token': this.token
      }
    }
  }


  getOrlandos()  {
    const url = `${baseUrl}/eventoorlandos`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, eventoorlando: Orlando}) => resp.eventoorlando)
      )
  }

  getOrlando(id: number) {
    const url = `${baseUrl}/eventoorlando/show/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, eventoorlando: Orlando}) => resp.eventoorlando)
        );
  }



}
