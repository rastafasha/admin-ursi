import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
const baseUrl = environment.apiUrl;

//ckeditor
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
import { Banner } from 'src/app/models/banner';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-banner-edit',
  templateUrl: './banner-edit.component.html',
  styleUrls: ['./banner-edit.component.css']
})
export class BannerEditComponent implements OnInit {


   /**
   * Editor type area wyswyg
   */
   public Editor = DecoupledEditor;
   public editorData = `<p>This is a CKEditor 5 WYSIWYG editor instance created with Angular.</p>`;


   public bannerForm: FormGroup;

   public banner: Banner;

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
       url: environment.apiUrl + '/banner/upload',
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
     private bannerService: BannerService,
     private location: Location,
     private activatedRoute: ActivatedRoute,
     private accountService: AccountService,
     private userService: UserService,
     private sanitizer: DomSanitizer
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
       this.titlePage = 'Editando Curso';
       this.bannerService.getBanner(+id).subscribe(
         res => {
           this.bannerForm.patchValue({
             id: res.id,
             title: res.title,
             target: res.target,
             gotBoton: res.gotBoton,
             botonName: res.botonName,
             url: res.url,
             description: res.description,
             status: res.status,
           });
           this.banner = res;
          //  console.log(this.banner);
         }
       );
     } else {
       this.titlePage = 'Creando Curso';
     }
   }

   validarFormulario(){
     this.bannerForm = this.fb.group({
       id: [''],
       title: ['', Validators.required],
       description: [''],
       target: ['', Validators.required],
       gotBoton: ['', Validators.required],
       botonName: [''],
       url: [''],
       status: ['PENDING'],
       image: [''],
     })
   }
   get title() {
     return this.bannerForm.get('title');
   }

   get description() {
     return this.bannerForm.get('description');
   }
   get target() {
    return this.bannerForm.get('target');
  }
   get gotBoton() {
     return this.bannerForm.get('gotBoton');
   }

   get botonName() {
     return this.bannerForm.get('botonName');
   }
   get url() {
     return this.bannerForm.get('url');
   }

   get status() {
     return this.bannerForm.get('status');
   }
   get image() {
     return this.bannerForm.get('image');
   }



   avatarUpload(datos) {
     const data = JSON.parse(datos.response);
     this.bannerForm.controls['image'].setValue(data.image);//almaceno el nombre de la imagen
   }

   deleteFotoPerfil(){
     this.bannerService.deleteFoto(this.bannerForm.value['id']).subscribe(response => {
       Swal.fire(response['msg']['summary'], response['msg']['detail'], 'success');
       this.ngOnInit();
     }, error => {
       Swal.fire('Error al eliminar', 'Intente de nuevo', 'error');
     });
   }



   editCurso(){

     const formData = new FormData();
     formData.append('title', this.bannerForm.get('title').value);
     formData.append('target', this.bannerForm.get('target').value);
     formData.append('gotBoton', this.bannerForm.get('gotBoton').value);
     formData.append('botonName', this.bannerForm.get('botonName').value);
     formData.append('description', this.bannerForm.get('description').value);
     formData.append('url', this.bannerForm.get('url').value);
     formData.append('image', this.bannerForm.get('image').value);
     formData.append('status', 'PENDING');

     const id = this.bannerForm.get('id').value;

     if(id){
       //actualizar
       const data = {
         ...this.bannerForm.value
       }

       this.bannerService.updateBanner(data, +id).subscribe(
         resp =>{
           Swal.fire('Actualizado', `Actualizado correctamente`, 'success');
           this.router.navigateByUrl(`/dashboard/banners`);
           this.banner= resp;
          //  console.log(this.banner);
         });

     }else{
       //crear
     const data = {
       ...this.bannerForm.value,
       user_id: this.user.id
     }
       this.bannerService.createBanner(data).subscribe(
         (resp: any) =>{
          this.banner= resp;
         Swal.fire('Creado', ` creado correctamente`, 'success');
         this.router.navigateByUrl(`/dashboard/banners`);
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
