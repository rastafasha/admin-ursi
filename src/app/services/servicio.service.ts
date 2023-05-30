import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Servicios } from '../models/servicios';
const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  public servicio: Servicios;

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
    return this.servicio.status!;
  }


  getServicios()  {
    const url = `${baseUrl}/services`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, services: Servicios}) => resp.services)
      )
  }

  getServicio(id: number) {
    const url = `${baseUrl}/service/show/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, service: Servicios}) => resp.service)
        );
  }


  createServicio(service:any) {
    const url = `${baseUrl}/service/store`;
    return this.http.post(url, service, this.headers);

  }

   updateServicio(service, id: number) {
    return this.http.put<any>(baseUrl + '/service/update/' + id, service, this.headers)

  }

  updateStatus(service: Servicios) {
    const url = `${baseUrl}/service/update/status/${service.id}`;
    return this.http.put(url, service, this.headers);

  }

  deleteFoto(id) {
    return this.http.delete(baseUrl + '/service/delete-foto/' + id);
  }


  deleteServicio(service: Servicios) {
    const url = `${baseUrl}/service/destroy/${service}`;
    return this.http.delete(url, this.headers);
  }

}
