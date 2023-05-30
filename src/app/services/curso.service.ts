import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Curso } from '../models/curso';
const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  public curso: Curso;

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
    return this.curso.status!;
  }






  getCursos()  {
    const url = `${baseUrl}/cursos`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, cursos: Curso}) => resp.cursos)
      )
  }

  getCurso(id: number) {
    const url = `${baseUrl}/curso/show/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, curso: Curso}) => resp.curso)
        );
  }


  createCurso(curso:any) {
    const url = `${baseUrl}/curso/store`;
    return this.http.post(url, curso, this.headers);

  }

  // updatePlan(plan, id:number): Observable<any> {
  //   const url = `${baseUrl}/plan/update/${plan.id}`;
  //   return this.http.put(url, plan, this.headers);
  //  }

   updateCurso(curso, id: number) {
    return this.http.put<any>(baseUrl + '/curso/update/' + id, curso, this.headers)

  }

  updateStatus(curso: Curso) {
    const url = `${baseUrl}/curso/update/status/${curso.id}`;
    return this.http.put(url, curso, this.headers);

  }

  deleteFoto(id) {
    return this.http.delete(baseUrl + '/curso/delete-foto/' + id);
  }


  deleteCurso(curso: Curso) {
    const url = `${baseUrl}/curso/destroy/${curso}`;
    return this.http.delete(url, this.headers);
  }

  search(query=''){
    return this.http.get(`${baseUrl}/curso/search`, {params: {buscar: query}})

  }

}
