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
  costo: any;
  image: string;
  created_at: string;
  updated_at: string;



  get imagenUrl(){

    if(!this.image){
      return `${base_url}cronologiacursos/no-image.jpg`;
    } else if(this.image.includes('https')){
      return this.image;
    } else if(this.image){
      return `${base_url}cronologiacursos/${this.image}`;
    }else {
      return `${base_url}/no-image.jpg`;
      // return `./assets/img/no-image.jpg`;
    }

  }

}
