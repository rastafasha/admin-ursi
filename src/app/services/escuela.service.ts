import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Escuela } from '../models/escuela';
const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class EscuelaService {

  public galleryschool: Escuela;

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



  getEscuelas()  {
    const url = `${baseUrl}/galleryschools`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, galleryschools: Escuela}) => resp.galleryschools)
      )
  }

  getEscuela(id: number) {
    const url = `${baseUrl}/galleryschool/show/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, galleryschool: Escuela}) => resp.galleryschool)
        );
  }


  createEscuela(galleryschool:any) {
    const url = `${baseUrl}/galleryschool/store`;
    return this.http.post(url, galleryschool, this.headers);

  }

   updateEscuela(galleryschool, id: number) {
    return this.http.put<any>(baseUrl + '/galleryschool/update/' + id, galleryschool, this.headers)

  }

  deleteFoto(id) {
    return this.http.delete(baseUrl + '/galleryschool/delete-foto/' + id);
  }


  deleteEscuela(galleryschool: Escuela) {
    const url = `${baseUrl}/galleryschool/destroy/${galleryschool}`;
    return this.http.delete(url, this.headers);
  }

}
