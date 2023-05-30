import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Joya } from '../models/joya';
const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class JoyaService {

  public joya: Joya;

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

  get status(): 'PUBLISHED' | 'PENDING' | 'REJECTED' {
    return this.joya.status!;
  }


  getJoyas()  {
    const url = `${baseUrl}/joyas`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, joyas: Joya}) => resp.joyas)
      )
  }

  getJoya(id: number) {
    const url = `${baseUrl}/joya/show/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, joya: Joya}) => resp.joya)
        );
  }


  createJoya(joya:any) {
    const url = `${baseUrl}/joya/store`;
    return this.http.post(url, joya, this.headers);

  }

   updateJoya(joya, id: number) {
    return this.http.put<any>(baseUrl + '/joya/update/' + id, joya, this.headers)

  }

  updateStatus(joya: Joya) {
    const url = `${baseUrl}/joya/update/status/${joya.id}`;
    return this.http.put(url, joya, this.headers);

  }

  deleteFoto(id) {
    return this.http.delete(baseUrl + '/joya/delete-foto/' + id);
  }


  deleteJoya(joya: Joya) {
    const url = `${baseUrl}/joya/destroy/${joya}`;
    return this.http.delete(url, this.headers);
  }

}
