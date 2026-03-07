import { environment } from "src/environments/environment";
const base_url = environment.apiUrlMedia;

export class Cronograma {
  id: number;
  modo: string;
  title: string;
  description: string;
  fecha: string;
  hora: string;
  clases: string;
  proyecto: string;
  duracion: string;
  modo_eng: string;
  title_eng: string;
  description_eng: string;
  fecha_eng: string;
  hora_eng: string;
  clases_eng: string;
  proyecto_eng: string;
  duracion_eng: string;
  costo: any;
  image: string = "";
    avatar: string = "";
  created_at: string;
  updated_at: string;
  status?: 'PUBLISHED' | 'PENDING' | 'REJECTED';



  get imagenUrl(){

     if(!this.image){
      return `${base_url}no-image.png`;
    } else if(this.image.includes('https')){
      return this.image;
    } else if(this.image){
      return `${base_url}/${this.image}`;
    }else {
      // return `${base_url}/no-image.png`;
      return `./assets/img/no-image.jpg`;
    }

  }

}
