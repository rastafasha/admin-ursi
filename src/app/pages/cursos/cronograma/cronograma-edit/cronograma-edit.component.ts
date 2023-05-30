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
  styleUrls: ['./cronograma-edit.component.css']
})
export class CronogramaEditComponent implements OnInit {


   /**
   * Editor type area wyswyg
   */
   public Editor = DecoupledEditor;
   public editorData = `<p>This is a CKEditor 5 WYSIWYG editor instance created with Angular.</p>`;


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

   public afuConfig = {
     multiple: false,
     formatsAllowed: '.jpg, .png, .gif, .jpeg',
     method: 'POST',
     maxSize: '2',
     uploadAPI: {
       url: environment.apiUrl + '/cronologiacurso/upload',
       headers: {
         Accept: 'application/json',
         Authorization: 'Bearer ' + this.accountService.headers

       },
       responseType: 'json',
     },
     theme: 'dragNDrop',
     selectFileBtn: 'Select Files',
     hideProgressBar: false,
     hideResetBtn: false,
     hideSelectBtn: false,
     fileNameIndex: true,
     replaceTexts: {
       selectFileBtn: 'Seleccionar imagen',
       resetBtn: 'Resetear',
       uploadBtn: 'Subir',
       dragNDropBox: 'Arrastre y suelte aquí',
       attachPinBtn: 'Seleccionar una imagen',
       afterUploadMsg_success: 'Se cargó correctamente el archivo !',
       afterUploadMsg_error: 'Se produjo un error al subir el archivo!',
       sizeLimit: 'Límite de tamaño 2 Megas'
     }
   };

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
   get price() {
    return this.cronologiacursoForm.get('price');
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
   get costo() {
     return this.cronologiacursoForm.get('costo');
   }
   get image() {
     return this.cronologiacursoForm.get('image');
   }



   avatarUpload(datos) {
     const data = JSON.parse(datos.response);
     this.cronologiacursoForm.controls['image'].setValue(data.image);//almaceno el nombre de la imagen
   }

   deleteFotoPerfil(){
     this.cronogramaService.deleteFoto(this.cronologiacursoForm.value['id']).subscribe(response => {
       Swal.fire(response['msg']['summary'], response['msg']['detail'], 'success');
       this.ngOnInit();
     }, error => {
       Swal.fire('Error al eliminar', 'Intente de nuevo', 'error');
     });
   }



   editCurso(){

     const formData = new FormData();
     formData.append('modo', this.cronologiacursoForm.get('modo').value);
     formData.append('title', this.cronologiacursoForm.get('title').value);
     formData.append('description', this.cronologiacursoForm.get('description').value);
     formData.append('fecha', this.cronologiacursoForm.get('fecha').value);
     formData.append('hora', this.cronologiacursoForm.get('hora').value);
     formData.append('clases', this.cronologiacursoForm.get('clases').value);
     formData.append('proyecto', this.cronologiacursoForm.get('proyecto').value);
     formData.append('duracion', this.cronologiacursoForm.get('duracion').value);
     formData.append('costo', this.cronologiacursoForm.get('costo').value);
     formData.append('image', this.cronologiacursoForm.get('image').value);

     const id = this.cronologiacursoForm.get('id').value;

     if(id){
       //actualizar
       const data = {
         ...this.cronologiacursoForm.value,
       }

       this.cronogramaService.updateCronograma(data, +id).subscribe(
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
       this.cronogramaService.createCronograma(data).subscribe(
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

}
