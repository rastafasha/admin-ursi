import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Category } from '../models/category';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public category: Category;


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


  getCategories() {
    const url = `${baseUrl}/categories`;
    return this.http.get<any>(url,this.headers)
      .pipe(
        map((resp:{ok: boolean, categories: Category}) => resp.categories)
      )
  }

  getCategory(category: any) {
    const url = `${baseUrl}/category/show/${category}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, category: Category}) => resp.category)
        );
  }


  createCategory(category:any) {
    const url = `${baseUrl}/category/store`;
    return this.http.post(url, category, this.headers);
  }

  updateCategory(category:Category) {
    const url = `${baseUrl}/category/update/${category.id}`;
    return this.http.put(url, category, this.headers);
  }

  deleteCategory(category: any) {
    const url = `${baseUrl}/category/destroy/${category}`;
    return this.http.delete(url, this.headers);
  }
}
