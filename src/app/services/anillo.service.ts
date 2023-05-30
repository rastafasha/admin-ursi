import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Anillo } from '../models/anillo';
const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AnilloService {

  public anillo: Anillo;

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
    return this.anillo.status!;
  }


  getAnillos()  {
    const url = `${baseUrl}/anillos`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, anillos: Anillo}) => resp.anillos)
      )
  }

  getAnillo(id: number) {
    const url = `${baseUrl}/anillo/show/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, anillo: Anillo}) => resp.anillo)
        );
  }


  createAnillo(anillo:any) {
    const url = `${baseUrl}/anillo/store`;
    return this.http.post(url, anillo, this.headers);

  }

   updateAnillo(anillo, id: number) {
    return this.http.put<any>(baseUrl + '/anillo/update/' + id, anillo, this.headers)

  }

  updateStatus(anillo: Anillo) {
    const url = `${baseUrl}/anillo/update/status/${anillo.id}`;
    return this.http.put(url, anillo, this.headers);

  }

  deleteFoto(id) {
    return this.http.delete(baseUrl + '/anillo/delete-foto/' + id);
  }


  deleteAnillo(anillo: Anillo) {
    const url = `${baseUrl}/anillo/destroy/${anillo}`;
    return this.http.delete(url, this.headers);
  }

}
