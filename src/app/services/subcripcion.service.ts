import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

import {map} from 'rxjs/operators';

import { Subcripcion } from '../models/subcripcion';
const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SubcripcionService {

  public subcripcion: Subcripcion;

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


  getSubcripcions()  {
    const url = `${baseUrl}/subcripcions`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, subcripcions: Subcripcion}) => resp.subcripcions)
      )
  }

  getSubcripcion(id: number) {
    const url = `${baseUrl}/subcripcion/show/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, subcripcion: Subcripcion}) => resp.subcripcion)
        );
  }




}
