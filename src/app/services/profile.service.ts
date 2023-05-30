import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Profile } from '../models/profile';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public profile: Profile;


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


  getProfiles() {
    const url = `${baseUrl}/profiles`;
    return this.http.get<any>(url,this.headers)
      .pipe(
        map((resp:{ok: boolean, profiles: Profile}) => resp.profiles)
      )
  }

  getProfile(profile: any) {
    const url = `${baseUrl}/profile/show/${profile}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, profile: Profile}) => resp.profile)
        );
  }


  createProfile(profile:any) {
    const url = `${baseUrl}/profile/store`;
    return this.http.post(url, profile, this.headers);
  }

  updateProfile(profile:Profile, id:number) {
    // const url = `${baseUrl}/profile/update/${profile.id}`;
    // return this.http.put(url, profile, this.headers);
    return this.http.put<any>(baseUrl + '/profile/update/' + id, profile, this.headers)

  }

  deleteProfile(profile: any) {
    const url = `${baseUrl}/profile/destroy/${profile}`;
    return this.http.delete(url, this.headers);
  }

  deleteFoto(id) {
    return this.http.delete(baseUrl + '/profile/delete-foto/' + id);
  }
}
