import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Galleries } from '../models/galleries';
const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class GalleriesService {

  public gallery: Galleries;

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
    return this.gallery.status!;
  }






  getGalleries()  {
    const url = `${baseUrl}/galleries`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, galleries: Galleries}) => resp.galleries)
      )
  }

  getGallery(id: number) {
    const url = `${baseUrl}/gallery/show/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, gallery: Galleries}) => resp.gallery)
        );
  }


  createGallery(gallery:any) {
    const url = `${baseUrl}/gallery/store`;
    return this.http.post(url, gallery, this.headers);

  }


   updateGallery(gallery, id: number) {
    return this.http.put<any>(baseUrl + '/gallery/update/' + id, gallery, this.headers)

  }

  updateStatus(gallery: Galleries) {
    const url = `${baseUrl}/gallery/update/status/${gallery.id}`;
    return this.http.put(url, gallery, this.headers);

  }

  deleteFoto(id) {
    return this.http.delete(baseUrl + '/gallery/delete-foto/' + id);
  }


  deleteGallery(gallery: Galleries) {
    const url = `${baseUrl}/gallery/destroy/${gallery}`;
    return this.http.delete(url, this.headers);
  }

}
