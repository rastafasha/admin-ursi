import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {map} from 'rxjs/operators';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';

//Eviroment
import { environment } from '../../environments/environment';
//Models
import { User } from '../models/user';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User;
  public identity: User;
  // public role: Role;
  error:string;

  constructor(
    private http: HttpClient,
    private router: Router,
    ) {
    this.user;
  }


  get token():string{
    return localStorage.getItem('auth_token') || '';
  }

  get role(): 'SUPERADMIN' | 'ADMIN' | 'MEMBER'| 'GUEST' {
    return this.user.role!;
  }


  get headers(){
    return{
      headers: {
        'auth_token': this.token

      }
    }

  }

  guardarLocalStorage( user:any, access_token: any){
    // localStorage.setItem('token', JSON.stringify(token));
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('auth_token', access_token.original.access_token);
  }

  getUserLocalStorage(): void {
    return this.user = JSON.parse(localStorage.getItem('user'));
  }


  getAll(): Observable<any> {

    const url = `${baseUrl}/users`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, users: User}) => resp.users)
      )
  }

  getUserById(id:number): Observable<any> {

    const url = `${baseUrl}/user/show/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, user: User}) => resp.user)
        );

  }

  getRecientes(): Observable<any> {
    const url = `${baseUrl}/user/recientes`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, users: User}) => resp.users)
      )
  }


  update(user: User) {
    const url = `${baseUrl}/user/update/${user.id}`;
    return this.http.put(url, user, this.headers);
  }

  deleteById(user:User): Observable<any> {
    const url = `${baseUrl}/user/destroy/${user}`;
    return this.http.delete(url, this.headers)
  }

  //soft deletes

  indexdelete(): Observable<any> {
    const url = `${baseUrl}/users/delete`;
    return this.http.get(url, this.headers)
  }
  userDeleteShow(id:number): Observable<any> {
    const url = `${baseUrl}/user/delete/show/${id}`;
    return this.http.get(url, this.headers)
  }
  userDeleteRestore(id:number): Observable<any> {
    const url = `${baseUrl}/user/delete/restore/${id}`;
    return this.http.put(url, this.headers)
  }
  userDeleteforce(id:number): Observable<any> {
    const url = `${baseUrl}/user/destroy/force/${id}`;
    return this.http.delete(url, this.headers)
  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }

  changePassword(data:User){
    const url = `${baseUrl}/reset-password/`;
    return this.http.post(url,  data, this.headers);
  }




  resetPassword(){
    const url = `${baseUrl}/reset-password/`;
    return this.http.post(url,  this.headers);
  }

  //editors

  getAllEditors(role:string): Observable<any> {
    const url = `${baseUrl}/users/editors/${role}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, users: User}) => resp.users)
      )
  }

  search(query=''){
    return this.http.get(`${baseUrl}/user/search`, {params: {buscar: query}})

  }




}
