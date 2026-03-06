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

@Component({
  selector: 'app-cursos-edit',
  templateUrl: './cursos-edit.component.html',
  standalone: false,
  styleUrls: ['./cursos-edit.component.css']
})
export class CursosEditComponent implements OnInit {


   public cursoForm: FormGroup;

   public curso: Curso;

   public imgSelect : String | ArrayBuffer;

   titlePage: string;
   option_selectedd: number = 1;
  solicitud_selectedd: any = null;

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
  userId:number;

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
       this.userId = this.user.id;
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
             name_eng: res.name_eng,
             description_eng: res.description_eng,
             adicional_eng: res.adicional_eng,
             slug: res.slug,
             user_id: res.user_id,
             status: res.status,
           });
           this.curso = res;
           this.imagePath = res.avatar;
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
       name_eng: [''],
       description_eng: [''],
       adicional_eng: [''],
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
   get name_eng() {
     return this.cursoForm.get('name_eng');
   }

   get description_eng() {
     return this.cursoForm.get('description_eng');
   }
   get adicional_eng() {
     return this.cursoForm.get('adicional_eng');
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
     formData.append('name', this.cursoForm.get('name').value);
     formData.append('price', this.cursoForm.get('price').value);
     formData.append('modal', this.cursoForm.get('modal').value);
     formData.append('urlVideo', this.cursoForm.get('urlVideo').value);
     formData.append('description', this.cursoForm.get('description').value);
     formData.append('adicional', this.cursoForm.get('adicional').value);
     formData.append('name_eng', this.cursoForm.get('name_eng').value);
     formData.append('description_eng', this.cursoForm.get('description_eng').value);
     formData.append('adicional_eng', this.cursoForm.get('adicional_eng').value);
     formData.append('slug', this.cursoForm.get('slug').value);
     formData.append('user_id', this.userId.toString());
     formData.append('isFeatured', this.cursoForm.get('isFeatured').value);
     
     formData.append('status', 'PENDING');
     if (this.FILE_AVATAR) {
         formData.append("imagen", this.FILE_AVATAR);
       }

     const id = this.cursoForm.get('id').value;

     if(id){
       //actualizar
       formData

       this.cursoService.updateCurso(formData, +id).subscribe(
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
       this.cursoService.createCurso(formData).subscribe(
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
