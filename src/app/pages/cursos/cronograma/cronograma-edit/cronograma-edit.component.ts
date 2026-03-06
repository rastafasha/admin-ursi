import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
const baseUrl = environment.apiUrl;

//ckeditor
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
import { Cronograma } from 'src/app/models/cronograma';
import { CronogramaService } from 'src/app/services/cronograma.service';

@Component({
  selector: 'app-cronograma-edit',
  templateUrl: './cronograma-edit.component.html',
  standalone: false,
  styleUrls: ['./cronograma-edit.component.css']
})
export class CronogramaEditComponent implements OnInit {


  option_selectedd: number = 1;
  solicitud_selectedd: any = null;

   public cronologiacursoForm: FormGroup;

   public cronologiacurso: Cronograma;

   public imgSelect : String | ArrayBuffer;

   titlePage: string;

   public cursoSeleccionado: Cronograma;
   public user: User;
   id:any;

   imagePath: string;
   error: string;
   uploadError: string;
   public storage = environment.apiUrlMedia

   imageUrl = environment.apiUrlMedia;
  public FILE_AVATAR: any;
  public IMAGE_PREVISUALIZA: any = "assets/images/no-image.png";
  text_validation: any = null;
  public loading: boolean = false;


   constructor(
     private fb: FormBuilder,
     private router: Router,
     private cronogramaService: CronogramaService,
     private location: Location,
     private activatedRoute: ActivatedRoute,
     private accountService: AccountService,
     private userService: UserService
     ) {
       this.user = this.userService.user;
      }

   ngOnInit(): void {
     this.validarFormulario();
     this.getUser();
     this.activatedRoute.params.subscribe( ({id}) => this.getCurso(id));
     window.scrollTo(0,0);
   }

   getUser(): void {

     this.user = JSON.parse(localStorage.getItem('user'));
     // this.activatedRoute.params.subscribe( ({id}) => this.getUserProfile(id));
     if(!this.user || !this.user.id || this.user.id == null || this.user.id == undefined){
       this.router.navigateByUrl('/login');

     }
       this.id = this.user.id;
   }

   getCurso(id: number){
     if (id !== null && id !== undefined) {
       this.titlePage = 'Editando Cronograma';
       this.cronogramaService.getCronograma(+id).subscribe(
         res => {
           this.cronologiacursoForm.patchValue({
             id: res.id,
             modo: res.modo,
             title: res.title,
             description: res.description,
             fecha: res.fecha,
             hora: res.hora,
             clases: res.clases,
             proyecto: res.proyecto,
             duracion: res.duracion,
             modo_eng: res.modo_eng,
             title_eng: res.title_eng,
             description_eng: res.description_eng,
             fecha_eng: res.fecha_eng,
             hora_eng: res.hora_eng,
             clases_eng: res.clases_eng,
             proyecto_eng: res.proyecto_eng,
             duracion_eng: res.duracion_eng,
             costo: res.costo,
           });
           this.cursoSeleccionado = res;
          //  console.log(this.cursoSeleccionado);
         }
       );
     } else {
       this.titlePage = 'Creando Cronograma';
     }
   }

   validarFormulario(){
     this.cronologiacursoForm = this.fb.group({
       id: [''],
       modo: ['', Validators.required],
       title: ['', Validators.required],
       description: ['', Validators.required],
       fecha: [''],
       hora: [''],
       clases: [' '],
       proyecto: [' '],
       duracion: [' '],
       modo_eng: [' '],
       title_eng: [' '],
       description_eng: [' '],
       fecha_eng: [' '],
       hora_eng: [' '],
       clases_eng: [' '],
       proyecto_eng: [' '],
       duracion_eng: [' '],
       costo: [''],
       image: [''],
     })
   }
   get title() {
     return this.cronologiacursoForm.get('title');
   }

   get description() {
     return this.cronologiacursoForm.get('description');
   }
   
   get fecha() {
     return this.cronologiacursoForm.get('fecha');
   }

   get modo() {
     return this.cronologiacursoForm.get('modo');
   }

   get hora() {
     return this.cronologiacursoForm.get('hora');
   }
   get clases() {
     return this.cronologiacursoForm.get('clases');
   }
   get proyecto() {
     return this.cronologiacursoForm.get('proyecto');
   }
   get duracion() {
     return this.cronologiacursoForm.get('duracion');
   }
   get title_eng() {
     return this.cronologiacursoForm.get('title_eng');
   }

   get description_eng() {
     return this.cronologiacursoForm.get('description_eng');
   }

   get fecha_eng() {
     return this.cronologiacursoForm.get('fecha_eng');
   }

   get modo_eng() {
     return this.cronologiacursoForm.get('modo_eng');
   }

   get hora_eng() {
     return this.cronologiacursoForm.get('hora_eng');
   }
   get clases_eng() {
     return this.cronologiacursoForm.get('clases_eng');
   }
   get proyecto_eng() {
     return this.cronologiacursoForm.get('proyecto_eng');
   }
   get duracion_eng() {
     return this.cronologiacursoForm.get('duracion_eng');
   }
   
   get costo() {
     return this.cronologiacursoForm.get('costo');
   }
   get image() {
     return this.cronologiacursoForm.get('image');
   }


loadFile($event: any) {
     if ($event.target.files[0].type.indexOf("image")) {
      this.text_validation = "Solamente pueden ser archivos de tipo imagen";
      return;
    }
    this.text_validation = "";
    this.FILE_AVATAR = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.FILE_AVATAR);
    reader.onloadend = () => (this.IMAGE_PREVISUALIZA = reader.result);
  }


   editCurso(){

     const formData = new FormData();
     formData.append('modo', this.cronologiacursoForm.get('modo').value);
     formData.append('title', this.cronologiacursoForm.get('title').value);
     formData.append('title_eng', this.cronologiacursoForm.get('title_eng').value);
     formData.append('description', this.cronologiacursoForm.get('description').value);
     formData.append('description_eng', this.cronologiacursoForm.get('description_eng').value);
     formData.append('fecha', this.cronologiacursoForm.get('fecha').value);
     formData.append('fecha_eng', this.cronologiacursoForm.get('fecha_eng').value);
     formData.append('hora', this.cronologiacursoForm.get('hora').value);
     formData.append('hora_eng', this.cronologiacursoForm.get('hora_eng').value);
     formData.append('clases', this.cronologiacursoForm.get('clases').value);
     formData.append('clases_eng', this.cronologiacursoForm.get('clases_eng').value);
     formData.append('proyecto', this.cronologiacursoForm.get('proyecto').value);
     formData.append('proyecto_eng', this.cronologiacursoForm.get('proyecto_eng').value);
     formData.append('duracion', this.cronologiacursoForm.get('duracion').value);
     formData.append('duracion_eng', this.cronologiacursoForm.get('duracion_eng').value);
     formData.append('costo', this.cronologiacursoForm.get('costo').value);
    //  formData.append('image', this.cronologiacursoForm.get('image').value);

     if (this.FILE_AVATAR) {
         formData.append("imagen", this.FILE_AVATAR);
       }

     const id = this.cronologiacursoForm.get('id').value;

     if(id){
       //actualizar
       

       this.cronogramaService.updateCronograma(formData, +id).subscribe(
         resp =>{
          this.cursoSeleccionado = resp;
           Swal.fire('Actualizado', `Actualizado correctamente`, 'success');
           this.router.navigateByUrl(`/dashboard/cronogramas`);
          //  console.log(this.cursoSeleccionado);
         });

     }else{
       //crear
     const data = {
       ...this.cronologiacursoForm.value,
     }
       this.cronogramaService.createCronograma(formData).subscribe(
         (resp: any) =>{
          this.cursoSeleccionado = resp;
         Swal.fire('Creado', ` creado correctamente`, 'success');
         this.router.navigateByUrl(`/dashboard/cronogramas`);
         // this.enviarNotificacion();
       });
     }
     return false;
   }

   goBack() {
     this.location.back(); // <-- go back to previous location on cancel
   }





   //ckeditor

   public onReady( editor ) {
     editor.ui.getEditableElement().parentElement.insertBefore(
         editor.ui.view.toolbar.element,
         editor.ui.getEditableElement()
     );


   }

   simpleUpload: {
     // The URL that the images are uploaded to.
     uploadUrl: 'https://ursigalletti.net/backend-api/public/api/curso/upload/',

     // Enable the XMLHttpRequest.withCredentials property.
     withCredentials: true,

     // Headers sent along with the XMLHttpRequest to the upload server.

   }

   optionSelected(value: number) {
    this.option_selectedd = value;
    if (this.option_selectedd === 1) {
      // this.ngOnInit();
    }
    if (this.option_selectedd === 2) {
      this.solicitud_selectedd = null;
    }
  }

}
