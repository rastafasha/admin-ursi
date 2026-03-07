import { environment } from "src/environments/environment";
const base_url = environment.apiUrlMedia;

export class Herramienta {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  title_eng: string;
  subtitle_eng: string;
  description_eng: string;
  price: any;
  image: string = "";
    avatar: string = "";
  created_at: string;
  updated_at: string;
  status?: 'PUBLISHED' | 'PENDING' | 'REJECTED';


   get imagenUrl(){

      if(!this.image){
        return `${base_url}/no-image.png`;
      } else if(this.image.includes('https')){
        return this.image;
      } else if(this.image){
        return `${base_url}/herramientas/${this.image}`;
      }else {
        return `${base_url}/no-image.png`;
      }

    }

}
