import { environment } from "src/environments/environment";
const base_url = environment.apiUrlMedia;

export class Escuela {
  id: number;
  image: string;
  title: string;
  created_at: string;
  updated_at: string;



  get imagenUrl(){

    if(!this.image){
      return `${base_url}galleryschools/no-image.jpg`;
    } else if(this.image.includes('https')){
      return this.image;
    } else if(this.image){
      return `${base_url}galleryschools/${this.image}`;
    }else {
      return `${base_url}/no-image.jpg`;
      // return `./assets/img/no-image.jpg`;
    }

  }

}
