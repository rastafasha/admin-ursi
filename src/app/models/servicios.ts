import { environment } from "src/environments/environment";
const base_url = environment.apiUrlMedia;

export class Servicios {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  title_eng: string;
  subtitle_eng: string;
  description_eng: string;
  model: string;
  price: any;
  videoUrl: string;
  image?: string = "";
  created_at: string;
  updated_at: string;
  status?: 'PUBLISHED' | 'PENDING' | 'REJECTED';

  get imagenUrl(){

    if(!this.image){
      return `${base_url}servicios/no-image.jpg`;
    } else if(this.image.includes('https')){
      return this.image;
    } else if(this.image){
      return `${base_url}servicios/${this.image}`;
    }else {
      return `${base_url}/no-image.jpg`;
      // return `./assets/img/no-image.jpg`;
    }
  }

}
