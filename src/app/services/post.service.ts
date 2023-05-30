import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Post } from '../models/post';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public post: Post;


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


  getPosts() {
    const url = `${baseUrl}/posts`;
    return this.http.get<any>(url,this.headers)
      .pipe(
        map((resp:{ok: boolean, posts: Post}) => resp.posts)
      )
  }

  getPost(post: any) {
    const url = `${baseUrl}/post/show/${post}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, post: Post}) => resp.post)
        );
  }


  createPost(post:any) {
    const url = `${baseUrl}/post/store`;
    return this.http.post(url, post, this.headers);
  }

  updatePost(post:Post, id: number) {
    return this.http.put<any>(baseUrl + '/post/update/' + id, post, this.headers)

  }
  updateStatus(post:Post) {
    const url = `${baseUrl}/post/update/status/${post.id}`;
    return this.http.put(url, post, this.headers);

  }

  deletePost(post: any) {
    const url = `${baseUrl}/post/destroy/${post}`;
    return this.http.delete(url, this.headers);
  }

  deleteFoto(id) {
    return this.http.delete(baseUrl + '/post/delete-foto/' + id);
  }
}
