import { environment } from "src/environments/environment";
const base_url = environment.apiUrlMedia;

export class Banner {
  id: number;
  title: string;
  description: string;
  target: string;
  gotBoton: boolean;
  botonName: string;
  url: string;
  image: string;
  created_at: string;
  updated_at: string;
  status?: 'PUBLISHED' | 'PENDING' | 'REJECTED';


  get imagenUrl(){

    if(!this.image){
      return `${base_url}banners/no-image.jpg`;
    } else if(this.image.includes('https')){
      return this.image;
    } else if(this.image){
      return `${base_url}banners/${this.image}`;
    }else {
      return `${base_url}/no-image.jpg`;
      // return `./assets/img/no-image.jpg`;
    }

  }

}
