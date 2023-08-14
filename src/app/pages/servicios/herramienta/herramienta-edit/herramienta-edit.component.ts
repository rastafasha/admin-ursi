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
import { Herramienta } from 'src/app/models/herramienta';
import { HerramientaService } from 'src/app/services/herramienta.service';
@Component({
  selector: 'app-herramienta-edit',
  templateUrl: './herramienta-edit.component.html',
  styleUrls: ['./herramienta-edit.component.css']
})
export class HerramientaEditComponent implements OnInit {
/**
   * Editor type area wyswyg
   */
public Editor = DecoupledEditor;
public editorData = `<p>This is a CKEditor 5 WYSIWYG editor instance created with Angular.</p>`;


public servicioForm: FormGroup;

public servicio: Herramienta;

public imgSelect : String | ArrayBuffer;

titlePage: string;

public servicioSeleccionado: Herramienta;
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
    url: environment.apiUrl + '/herramienta/upload',
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
  private herramientaService: HerramientaService,
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
    this.titlePage = 'Editando Herramienta';
    this.herramientaService.getHerramienta(+id).subscribe(
      res => {
        this.servicioForm.patchValue({
          id: res.id,
          title: res.title,
          subtitle: res.subtitle,
          description: res.description,
          status: res.status,
        });
        this.servicioSeleccionado = res;
        // console.log(this.servicioSeleccionado);
      }
    );
  } else {
    this.titlePage = 'Creando Herramienta';
  }
}

validarFormulario(){
  this.servicioForm = this.fb.group({
    id: [''],
    title: ['', Validators.required],
    subtitle: [''],
    description: ['', Validators.required],
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
  this.herramientaService.deleteFoto(this.servicioForm.value['id']).subscribe(response => {
    Swal.fire(response['msg']['summary'], response['msg']['detail'], 'success');
    this.ngOnInit();
  }, error => {
    Swal.fire('Error al eliminar', 'Intente de nuevo', 'error');
  });
}



editServicio(){

  const formData = new FormData();
  formData.append('title', this.servicioForm.get('title').value);
  formData.append('subtitle', this.servicioForm.get('subtitle').value);
  formData.append('description', this.servicioForm.get('description').value);
  formData.append('image', this.servicioForm.get('image').value);
  formData.append('status', 'PENDING');

  const id = this.servicioForm.get('id').value;

  if(id){
    //actualizar
    const data = {
      ...this.servicioForm.value
    }

    this.herramientaService.updateHerramienta(data, +id).subscribe(
      resp =>{
        this.servicioSeleccionado =resp;
        Swal.fire('Actualizado', `Actualizado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/herramientas`);
        // console.log(this.servicioSeleccionado);
      });

  }else{
    //crear
  const data = {
    ...this.servicioForm.value
  }
    this.herramientaService.createHerramienta(data).subscribe(
      (resp: any) =>{
        this.servicioSeleccionado =resp;
      Swal.fire('Creado', ` creado correctamente`, 'success');
      this.router.navigateByUrl(`/dashboard/herramientas`);
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
