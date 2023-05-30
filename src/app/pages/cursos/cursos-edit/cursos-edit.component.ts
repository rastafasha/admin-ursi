import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
const baseUrl = environment.apiUrl;

//ckeditor
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';

@Component({
  selector: 'app-cursos-edit',
  templateUrl: './cursos-edit.component.html',
  styleUrls: ['./cursos-edit.component.css']
})
export class CursosEditComponent implements OnInit {

   /**
   * Editor type area wyswyg
   */
   public Editor = DecoupledEditor;
   public editorData = `<p>This is a CKEditor 5 WYSIWYG editor instance created with Angular.</p>`;


   public cursoForm: FormGroup;

   public curso: Curso;

   public imgSelect : String | ArrayBuffer;

   titlePage: string;

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
       url: environment.apiUrl + '/curso/upload',
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
     private cursoService: CursoService,
     private location: Location,
     private activatedRoute: ActivatedRoute,
     private accountService: AccountService,
     private userService: UserService,
     private sanitizer: DomSanitizer
     ) {
       this.user = this.userService.user;
       this.curso = this.cursoService.curso;
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
       this.titlePage = 'Editando Curso';
       this.cursoService.getCurso(+id).subscribe(
         res => {
           this.cursoForm.patchValue({
             id: res.id,
             name: res.name,
             price: res.price,
             modal: res.modal,
             urlVideo: res.urlVideo,
             description: res.description,
             adicional: res.adicional,
             isFeatured: res.isFeatured,
             slug: res.slug,
             user_id: res.user_id,
             status: res.status,
           });
           this.curso = res;
           console.log(this.curso);
         }
       );
     } else {
       this.titlePage = 'Creando Curso';
     }
   }

   validarFormulario(){
     this.cursoForm = this.fb.group({
       id: [''],
       name: ['', Validators.required],
       description: ['', Validators.required],
       price: ['', Validators.required],
       modal: ['', Validators.required],
       adicional: ['', Validators.required],
       slug: ['', Validators.required],
       urlVideo: [''],
       isFeatured: [''],
       status: ['PENDING'],
       image: [''],
       user_id: [' '],
     })
   }
   get name() {
     return this.cursoForm.get('name');
   }

   get description() {
     return this.cursoForm.get('description');
   }
   get adicional() {
     return this.cursoForm.get('adicional');
   }
   get price() {
    return this.cursoForm.get('price');
  }
   get modal() {
     return this.cursoForm.get('modal');
   }

   get urlVideo() {
     return this.cursoForm.get('urlVideo');
   }

   get status() {
     return this.cursoForm.get('status');
   }
   get image() {
     return this.cursoForm.get('image');
   }

   get user_id() {
     return this.cursoForm.get('user_id');
   }
   get isFeatured() {
     return this.cursoForm.get('isFeatured');
   }
   get slug() {
     return this.cursoForm.get('slug');
   }


   avatarUpload(datos) {
     const data = JSON.parse(datos.response);
     this.cursoForm.controls['image'].setValue(data.image);//almaceno el nombre de la imagen
   }

   deleteFotoPerfil(){
     this.cursoService.deleteFoto(this.cursoForm.value['id']).subscribe(response => {
       Swal.fire(response['msg']['summary'], response['msg']['detail'], 'success');
       this.ngOnInit();
     }, error => {
       Swal.fire('Error al eliminar', 'Intente de nuevo', 'error');
     });
   }



   editCurso(){

     const formData = new FormData();
     formData.append('name', this.cursoForm.get('name').value);
     formData.append('price', this.cursoForm.get('price').value);
     formData.append('modal', this.cursoForm.get('modal').value);
     formData.append('urlVideo', this.cursoForm.get('urlVideo').value);
     formData.append('description', this.cursoForm.get('description').value);
     formData.append('adicional', this.cursoForm.get('adicional').value);
     formData.append('slug', this.cursoForm.get('slug').value);
     formData.append('user_id', this.cursoForm.get('user_id').value);
     formData.append('isFeatured', this.cursoForm.get('isFeatured').value);
     formData.append('image', this.cursoForm.get('image').value);
     formData.append('status', 'PENDING');

     const id = this.cursoForm.get('id').value;

     if(id){
       //actualizar
       const data = {
         ...this.cursoForm.value,
         user_id: this.user.id
       }

       this.cursoService.updateCurso(data, +id).subscribe(
         resp =>{
           Swal.fire('Actualizado', `Actualizado correctamente`, 'success');
           this.router.navigateByUrl(`/dashboard/cursos`);
           this.curso= resp;
           console.log(this.curso);
         });

     }else{
       //crear
     const data = {
       ...this.cursoForm.value,
       user_id: this.user.id
     }
       this.cursoService.createCurso(data).subscribe(
         (resp: any) =>{
          this.curso= resp;
         Swal.fire('Creado', ` creado correctamente`, 'success');
         this.router.navigateByUrl(`/dashboard/cursos`);
       });
     }
     return false;
   }



   getVideoIframe(url) {
    var video, results;

    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];

    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
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
