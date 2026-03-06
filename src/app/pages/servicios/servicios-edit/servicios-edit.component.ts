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
import { Servicios } from 'src/app/models/servicios';
import { ServicioService } from 'src/app/services/servicio.service';


@Component({
  selector: 'app-servicios-edit',
  templateUrl: './servicios-edit.component.html',
  standalone: false,
  styleUrls: ['./servicios-edit.component.css']
})
export class ServiciosEditComponent implements OnInit {

  option_selectedd:number = 1;
  solicitud_selectedd:any = null;

  public servicioForm: FormGroup;

  public servicio: Servicios;

  public imgSelect : String | ArrayBuffer;

  titlePage: string;

  public servicioSeleccionado: Servicios;
  public user: User;
  id:any;

  imagePath: string;
  error: string;
  uploadError: string;
  imageUrl = environment.apiUrlMedia;
  public FILE_AVATAR: any;
  public IMAGE_PREVISUALIZA: any = "assets/images/no-image.png";
  text_validation: any = null;
  public loading: boolean = false;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private servicioService: ServicioService,
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
    this.activatedRoute.params.subscribe( ({id}) => this.getServicio(id));
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

  getServicio(id: number){
    if (id !== null && id !== undefined) {
      this.titlePage = 'Editando Servicio';
      this.servicioService.getServicio(+id).subscribe(
        res => {
          this.servicioForm.patchValue({
            id: res.id,
            title: res.title,
            price: res.price,
            subtitle: res.subtitle,
            title_eng: res.title_eng,
            subtitle_eng: res.subtitle_eng,
            description_eng: res.description_eng,
            videoUrl: res.videoUrl,
            description: res.description,
            status: res.status,
          });
          this.servicioSeleccionado = res;
          this.imagePath = res.avatar;
          // console.log(this.servicioSeleccionado);
        }
      );
    } else {
      this.titlePage = 'Creando Servicio';
    }
  }

  validarFormulario(){
    this.servicioForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      subtitle: [''],
      description: ['', Validators.required],
      price: [''],
      videoUrl: [''],
      title_eng: [''],
      subtitle_eng: [''],
      description_eng: [''],
      status: ['PENDING'],
      image: [''],
    })
  }
  get title() {
    return this.servicioForm.get('title');
  }

  get subtitle() {
    return this.servicioForm.get('subtitle');
  }

  get description() {
    return this.servicioForm.get('description');
  }
  get title_eng() {
  return this.servicioForm.get('title_eng');
}

get subtitle_eng() {
  return this.servicioForm.get('subtitle_eng');
}

get description_eng() {
  return this.servicioForm.get('description_eng');
}
  get price() {
   return this.servicioForm.get('price');
 }

  get videoUrl() {
    return this.servicioForm.get('videoUrl');
  }

  get status() {
    return this.servicioForm.get('status');
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

  editServicio(){

    const formData = new FormData();
    formData.append('title', this.servicioForm.get('title').value);
    formData.append('price', this.servicioForm.get('price').value);
    formData.append('subtitle', this.servicioForm.get('subtitle').value);
    formData.append('title_eng', this.servicioForm.get('title_eng').value);
  formData.append('subtitle_eng', this.servicioForm.get('subtitle_eng').value);
  formData.append('description_eng', this.servicioForm.get('description_eng').value);
    formData.append('videoUrl', this.servicioForm.get('videoUrl').value);
    formData.append('description', this.servicioForm.get('description').value);
    // formData.append('image', this.servicioForm.get('image').value);
    formData.append('status', 'PENDING');

    const id = this.servicioForm.get('id').value;

    if (this.FILE_AVATAR) {
          formData.append("imagen", this.FILE_AVATAR);
        }
    

    if(id){

      this.servicioService.updateServicio(formData, +id).subscribe(
        resp =>{
          this.servicioSeleccionado =resp;
          Swal.fire('Actualizado', `Actualizado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/servicios`);
          // console.log(this.servicioSeleccionado);
        });

    }else{
      //crear
    const data = {
      ...this.servicioForm.value
    }
      this.servicioService.createServicio(formData).subscribe(
        (resp: any) =>{
          this.servicioSeleccionado =resp;
        Swal.fire('Creado', ` creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/servicios`);
        // this.enviarNotificacion();
      });
    }
    return false;
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
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

  optionSelected(value:number){
      this.option_selectedd = value;
      if(this.option_selectedd === 1){
        // this.ngOnInit();
      }
      if(this.option_selectedd === 2){
        this.solicitud_selectedd = null;
      }
    }
}
