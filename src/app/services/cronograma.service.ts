import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Cronograma } from '../models/cronograma';
const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CronogramaService {

  public cronologiacurso: Cronograma;

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


  getCronogramas()  {
    const url = `${baseUrl}/cronologiacursos`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, cronologiacursos: Cronograma}) => resp.cronologiacursos)
      )
  }

  getCronograma(id: number) {
    const url = `${baseUrl}/cronologiacurso/show/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, cronologiacurso: Cronograma}) => resp.cronologiacurso)
        );
  }


  createCronograma(cronologiacurso:any) {
    const url = `${baseUrl}/cronologiacurso/store`;
    return this.http.post(url, cronologiacurso, this.headers);

  }

   updateCronograma(cronologiacurso, id: number) {
    return this.http.put<any>(baseUrl + '/cronologiacurso/update/' + id, cronologiacurso, this.headers)

  }


  deleteFoto(id) {
    return this.http.delete(baseUrl + '/cronologiacurso/delete-foto/' + id);
  }


  deleteCronograma(cronologiacurso: Cronograma) {
    const url = `${baseUrl}/cronologiacurso/destroy/${cronologiacurso}`;
    return this.http.delete(url, this.headers);
  }

  search(query=''){
    return this.http.get(`${baseUrl}/cronologiacurso/search`, {params: {buscar: query}})

  }

}
