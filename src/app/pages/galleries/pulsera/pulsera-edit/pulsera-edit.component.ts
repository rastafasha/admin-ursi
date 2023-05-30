import { Component, OnInit, ViewChild} from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

const baseUrl = environment.apiUrl;

//ckeditor
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { PulseraService } from 'src/app/services/pulsera.service';
import { Pulsera } from 'src/app/models/pulsera';

@Component({
  selector: 'app-pulsera-edit',
  templateUrl: './pulsera-edit.component.html',
  styleUrls: ['./pulsera-edit.component.css']
})
export class PulseraEditComponent implements OnInit {


  /**
   * Editor type area wyswyg
   */
  public Editor = DecoupledEditor;
  public editorData = `<p>This is a CKEditor 5 WYSIWYG editor instance created with Angular.</p>`;


  public pulseraForm: FormGroup;

  public pulsera: Pulsera;

  public imgSelect : String | ArrayBuffer;

  titlePage: string;

  public anilloSeleccionado: Pulsera;
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
      url: environment.apiUrl + '/pulsera/upload',
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
    private pulseraService: PulseraService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private userService: UserService,
    ) {
      this.user = this.userService.user;
     }

  ngOnInit(): void {
    this.validarFormulario();
    this.getUser();
    this.activatedRoute.params.subscribe( ({id}) => this.getAnillo(id));
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

  getAnillo(id: number){
    if (id !== null && id !== undefined) {
      this.titlePage = 'Editando pulsera';
      this.pulseraService.getPulsera(+id).subscribe(
        res => {
          this.pulseraForm.patchValue({
            id: res.id,
            title: res.title,
            price: res.price,
            model: res.model,
            description: res.description,
            user_id: res.user_id,
            status: res.status,
          });
          this.anilloSeleccionado = res;
          // console.log(this.anilloSeleccionado);
        }
      );
    } else {
      this.titlePage = 'Creando pulsera';
    }
  }

  validarFormulario(){
    this.pulseraForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      model: [''],
      status: ['PENDING'],
      image: [''],
      user_id: [' '],
    })
  }
  get title() {
    return this.pulseraForm.get('title');
  }

  get description() {
    return this.pulseraForm.get('description');
  }
  get price() {
   return this.pulseraForm.get('price');
 }
  get model() {
    return this.pulseraForm.get('model');
  }
  get status() {
    return this.pulseraForm.get('status');
  }
  get image() {
    return this.pulseraForm.get('image');
  }

  get user_id() {
    return this.pulseraForm.get('user_id');
  }


  avatarUpload(datos) {
    const data = JSON.parse(datos.response);
    this.pulseraForm.controls['image'].setValue(data.image);//almaceno el nombre de la imagen
  }

  deleteFotoPerfil(){
    this.pulseraService.deleteFoto(this.pulseraForm.value['id']).subscribe(response => {
      Swal.fire(response['msg']['summary'], response['msg']['detail'], 'success');
      this.ngOnInit();
    }, error => {
      Swal.fire('Error al eliminar', 'Intente de nuevo', 'error');
    });
  }



  editCurso(){

    const formData = new FormData();
    formData.append('title', this.pulseraForm.get('title').value);
    formData.append('price', this.pulseraForm.get('price').value);
    formData.append('model', this.pulseraForm.get('model').value);
    formData.append('description', this.pulseraForm.get('description').value);
    formData.append('user_id', this.pulseraForm.get('user_id').value);
    formData.append('image', this.pulseraForm.get('image').value);
    formData.append('status', 'PENDING');

    const id = this.pulseraForm.get('id').value;

    if(id){
      //actualizar
      const data = {
        ...this.pulseraForm.value,
        user_id: this.user.id
      }

      this.pulseraService.updatePulsera(data, +id).subscribe(
        resp =>{
          this.anilloSeleccionado = resp;
          Swal.fire('Actualizado', `Actualizado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/pulseras`);
          // console.log(this.anilloSeleccionado);
        });

    }else{
      //crear
    const data = {
      ...this.pulseraForm.value,
      user_id: this.user.id
    }
      this.pulseraService.createPulsera(data).subscribe(
        (resp: any) =>{
          this.anilloSeleccionado = resp;
        Swal.fire('Creado', ` creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/pulseras`);
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
