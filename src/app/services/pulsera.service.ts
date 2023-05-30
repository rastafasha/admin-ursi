import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Pulsera } from '../models/pulsera';
const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PulseraService {

  public pulsera: Pulsera;

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
    return this.pulsera.status!;
  }


  getPulseras()  {
    const url = `${baseUrl}/pulseras`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, pulseras: Pulsera}) => resp.pulseras)
      )
  }

  getPulsera(id: number) {
    const url = `${baseUrl}/pulsera/show/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, pulsera: Pulsera}) => resp.pulsera)
        );
  }


  createPulsera(pulsera:any) {
    const url = `${baseUrl}/pulsera/store`;
    return this.http.post(url, pulsera, this.headers);

  }

   updatePulsera(pulsera, id: number) {
    return this.http.put<any>(baseUrl + '/pulsera/update/' + id, pulsera, this.headers)

  }

  updateStatus(pulsera: Pulsera) {
    const url = `${baseUrl}/pulsera/update/status/${pulsera.id}`;
    return this.http.put(url, pulsera, this.headers);

  }

  deleteFoto(id) {
    return this.http.delete(baseUrl + '/pulsera/delete-foto/' + id);
  }


  deletePulsera(pulsera: Pulsera) {
    const url = `${baseUrl}/pulsera/destroy/${pulsera}`;
    return this.http.delete(url, this.headers);
  }

}
