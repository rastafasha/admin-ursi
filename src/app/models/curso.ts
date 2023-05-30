import { environment } from "src/environments/environment";
const base_url = environment.apiUrlMedia;

export class Curso {
  id: number;
  user_id: number;
  name: string;
  price: any;
  modal: string;
  urlVideo?: string;
  description: string;
  adicional: string;
  slug: string;
  image: string;
  isFeatured: boolean;
  created_at: string;
  updated_at: string;
  status?: 'PUBLISHED' | 'PENDING' | 'REJECTED';



  constructor(id, name, price, image, description  ){
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.description = description;
  }

  get imagenUrl(){

    if(!this.image){
      return `${base_url}cursos/no-image.jpg`;
    } else if(this.image.includes('https')){
      return this.image;
    } else if(this.image){
      return `${base_url}cursos/${this.image}`;
    }else {
      return `${base_url}/no-image.jpg`;
      // return `./assets/img/no-image.jpg`;
    }

  }

}
