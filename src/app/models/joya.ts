import { environment } from "src/environments/environment";
const base_url = environment.apiUrlMedia;

export class Joya {
  id: number;
  image: string;
  created_at: string;
  updated_at: string;
  status?: 'PUBLISHED' | 'PENDING' | 'REJECTED';



  get imagenUrl(){

    if(!this.image){
      return `${base_url}joyas/no-image.jpg`;
    } else if(this.image.includes('https')){
      return this.image;
    } else if(this.image){
      return `${base_url}joyas/${this.image}`;
    }else {
      return `${base_url}/no-image.jpg`;
      // return `./assets/img/no-image.jpg`;
    }

  }

}
