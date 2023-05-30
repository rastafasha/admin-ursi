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
  styleUrls: ['./servicios-edit.component.css']
})
export class ServiciosEditComponent implements OnInit {

  /**
   * Editor type area wyswyg
   */
  public Editor = DecoupledEditor;
  public editorData = `<p>This is a CKEditor 5 WYSIWYG editor instance created with Angular.</p>`;


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
  public storage = environment.apiUrlMedia

  public afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg, .png, .gif, .jpeg',
    method: 'POST',
    maxSize: '2',
    uploadAPI: {
      url: environment.apiUrl + '/servicio/upload',
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
            videoUrl: res.videoUrl,
            description: res.description,
            status: res.status,
          });
          this.servicioSeleccionado = res;
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
  get price() {
   return this.servicioForm.get('price');
 }

  get videoUrl() {
    return this.servicioForm.get('videoUrl');
  }

  get status() {
    return this.servicioForm.get('status');
  }
  get image() {
    return this.servicioForm.get('image');
  }


  avatarUpload(datos) {
    const data = JSON.parse(datos.response);
    this.servicioForm.controls['image'].setValue(data.image);//almaceno el nombre de la imagen
  }

  deleteFotoPerfil(){
    this.servicioService.deleteFoto(this.servicioForm.value['id']).subscribe(response => {
      Swal.fire(response['msg']['summary'], response['msg']['detail'], 'success');
      this.ngOnInit();
    }, error => {
      Swal.fire('Error al eliminar', 'Intente de nuevo', 'error');
    });
  }



  editServicio(){

    const formData = new FormData();
    formData.append('title', this.servicioForm.get('title').value);
    formData.append('price', this.servicioForm.get('price').value);
    formData.append('subtitle', this.servicioForm.get('subtitle').value);
    formData.append('videoUrl', this.servicioForm.get('videoUrl').value);
    formData.append('description', this.servicioForm.get('description').value);
    formData.append('image', this.servicioForm.get('image').value);
    formData.append('status', 'PENDING');

    const id = this.servicioForm.get('id').value;

    if(id){
      //actualizar
      const data = {
        ...this.servicioForm.value
      }

      this.servicioService.updateServicio(data, +id).subscribe(
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
      this.servicioService.createServicio(data).subscribe(
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
}
