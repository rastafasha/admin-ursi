import { User } from "./user";
import { environment } from "src/environments/environment";

const base_url = environment.apiUrlMedia;

export class Payment {
   id:number;
   user_id?:User;
   monto:string;
   referencia?:string;
   curso_id?:number;
   nombre?:string;
   name?:string;
   email?:string;
   updated_at:Date;
   created_at:Date;

}
