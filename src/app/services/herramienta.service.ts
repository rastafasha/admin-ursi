import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Herramienta } from '../models/herramienta';
const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class HerramientaService {

  public herramienta: Herramienta;

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
    return this.herramienta.status!;
  }






  getHerramientas()  {
    const url = `${baseUrl}/herramientas`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, herramientas: Herramienta}) => resp.herramientas)
      )
  }

  getHerramienta(id: number) {
    const url = `${baseUrl}/herramienta/show/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, herramienta: Herramienta}) => resp.herramienta)
        );
  }


  createHerramienta(herramienta:any) {
    const url = `${baseUrl}/herramienta/store`;
    return this.http.post(url, herramienta, this.headers);

  }

   updateHerramienta(herramienta, id: number) {
    return this.http.put<any>(baseUrl + '/herramienta/update/' + id, herramienta, this.headers)

  }

  updateStatus(herramienta: Herramienta) {
    const url = `${baseUrl}/herramienta/update/status/${herramienta.id}`;
    return this.http.put(url, herramienta, this.headers);

  }

  deleteFoto(id) {
    return this.http.delete(baseUrl + '/herramienta/delete-foto/' + id);
  }


  deleteHerramienta(herramienta: Herramienta) {
    const url = `${baseUrl}/herramienta/destroy/${herramienta}`;
    return this.http.delete(url, this.headers);
  }

}
