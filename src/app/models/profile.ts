import { environment } from "src/environments/environment";
import { Post } from "./post";
const base_url = environment.apiUrlMedia;
export class Profile {

  id: string;
  user_id: number = 0;
  // role_id: number = 3; // 3 = Rol miembro
  nombre: string = "";
  surname: string = "";
  email: string = "";
  direccion?: string = "";
  pais?: string = "";
  estado?: string = "";
  telhome?: string = "";
  telmovil?: string = "";
  facebook?: string = "";
  instagram?: string = "";
  twitter?: string = "";
  linkedin?: string = "";
  image: string = "";
  status?: 'VERIFIED' | 'PENDING' | 'REJECTED';
  created_at?: any;
  updated_at?: any;



  get imagenUrl(){

    if(!this.image){
      return `${base_url}profiles/no-image.jpg`;
    } else if(this.image.includes('https')){
      return this.image;
    } else if(this.image){
      return `${base_url}profiles/${this.image}`;
    }else {
      return `${base_url}/no-image.jpg`;
      // return `./assets/img/no-image.jpg`;
    }

  }
}
