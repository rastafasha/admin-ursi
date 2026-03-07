import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Banner } from 'src/app/models/banner';
import { BannerService } from 'src/app/services/banner.service';
const baseUrl = environment.apiUrl;

@Component({
  selector: 'app-banner-edit',
  templateUrl: './banner-edit.component.html',
  standalone: false,
  styleUrls: ['./banner-edit.component.css']
})
export class BannerEditComponent implements OnInit {


   public bannerForm: FormGroup;

   public banner: Banner;

   public imgSelect : String | ArrayBuffer;

   titlePage: string;

   public user: User;
   id:any;

   imagePath: string;
   imagePathMovil: string;
   error: string;
   uploadError: string;
   public storage = environment.apiUrlMedia


   imageUrl = environment.apiUrlMedia;
    public FILE_AVATAR: any;
    public IMAGE_PREVISUALIZA: any = "assets/images/no-image.png";
    public FILE_AVATAR2: any;
    public IMAGE_PREVISUALIZA2: any = "assets/images/no-image.png";
    text_validation: any = null;
    public loading: boolean = false;
  

   constructor(
     private fb: FormBuilder,
     private router: Router,
     private bannerService: BannerService,
     private location: Location,
     private activatedRoute: ActivatedRoute,
     private userService: UserService,
     ) {
       this.user = this.userService.user;
      }

   ngOnInit(): void {
     this.validarFormulario();
     this.getUser();
     this.activatedRoute.params.subscribe( ({id}) => this.getBann(id));
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

   getBann(id: number){
     if (id !== null && id !== undefined) {
       this.titlePage = 'Editando Banner';
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
             image: res.image,
             imagemovil: res.imagemovil,
           });
           this.banner = res;
           this.imagePath = res.avatar;
           this.imagePathMovil = res.avatarmovil;
          //  console.log(this.banner);
         }
       );
     } else {
       this.titlePage = 'Creando Banner';
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
       imagemovil: [''],
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
  
  loadFile($event: any) {
     if ($event.target.files[0].type.indexOf("image") === -1) {
      this.text_validation = "Solamente pueden ser archivos de tipo imagen";
      return;
    }
    this.text_validation = "";
    this.FILE_AVATAR = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.FILE_AVATAR);
    reader.onloadend = () => (this.IMAGE_PREVISUALIZA = reader.result);
  }

loadFile2($event: any) {
     if ($event.target.files[0].type.indexOf("image") === -1) {
      this.text_validation = "Solamente pueden ser archivos de tipo imagen";
      return;
    }
    this.text_validation = "";
    this.FILE_AVATAR2 = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.FILE_AVATAR2);
    reader.onloadend = () => (this.IMAGE_PREVISUALIZA2 = reader.result);
  }




   editBanner(){

     const formData = new FormData();
     formData.append('title', this.bannerForm.get('title').value);
     formData.append('target', this.bannerForm.get('target').value);
     formData.append('gotBoton', this.bannerForm.get('gotBoton').value);
     formData.append('botonName', this.bannerForm.get('botonName').value);
     formData.append('description', this.bannerForm.get('description').value);
     formData.append('url', this.bannerForm.get('url').value);
     formData.append('status', 'PENDING');

     if (this.FILE_AVATAR) {
         formData.append("imagen", this.FILE_AVATAR);
       }
     if (this.FILE_AVATAR2) {
         formData.append("imagemovil", this.FILE_AVATAR2);
       }
     const id = this.bannerForm.get('id').value;

     if(id){
       //actualizar
       
       this.bannerService.updateBanner(formData, +id).subscribe(
         resp =>{
           Swal.fire('Actualizado', `Actualizado correctamente`, 'success');
           this.router.navigateByUrl(`/dashboard/banners`);
           this.banner= resp;
          //  console.log(this.banner);
         });

     }else{
       //crear
       this.bannerService.createBanner(formData).subscribe(
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
