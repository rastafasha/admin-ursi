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
import { Anillo } from 'src/app/models/anillo';
import { AnilloService } from 'src/app/services/anillo.service';

@Component({
  selector: 'app-anillo-edit',
  templateUrl: './anillo-edit.component.html',
  styleUrls: ['./anillo-edit.component.css']
})
export class AnilloEditComponent implements OnInit {

  /**
   * Editor type area wyswyg
   */
  public Editor = DecoupledEditor;
  public editorData = `<p>This is a CKEditor 5 WYSIWYG editor instance created with Angular.</p>`;


  public anilloForm: FormGroup;
  submitted = false;
  public anillo: Anillo;

  public imgSelect : String | ArrayBuffer;

  titlePage: string;

  public anilloSeleccionado: Anillo;
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
      url: environment.apiUrl + '/anillo/upload',
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
    private anilloService: AnilloService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private userService: UserService,
    ) {
      this.user = this.userService.user;
     }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormulario(id));
    this.getUser();
    this.validarFormulario();
  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    // this.activatedRoute.params.subscribe( ({id}) => this.getUserProfile(id));
    if(!this.user || !this.user.id || this.user.id == null || this.user.id == undefined){
      this.router.navigateByUrl('/login');

    }
      this.id = this.user.id;
  }

  iniciarFormulario(id: number){
    if (id !== null && id !== undefined) {
      this.titlePage = 'Editando anillo';
      this.anilloService.getAnillo(+id).subscribe(
        res => {
          this.anilloForm.patchValue({
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
      this.titlePage = 'Creando anillo';
    }
  }

  validarFormulario(){
    this.anilloForm = this.fb.group({
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
    return this.anilloForm.get('title');
  }

  get description() {
    return this.anilloForm.get('description');
  }
  get price() {
   return this.anilloForm.get('price');
 }
  get model() {
    return this.anilloForm.get('model');
  }


  get status() {
    return this.anilloForm.get('status');
  }
  get image() {
    return this.anilloForm.get('image');
  }

  get user_id() {
    return this.anilloForm.get('user_id');
  }


  avatarUpload(datos) {
    const data = JSON.parse(datos.response);
    this.anilloForm.controls['image'].setValue(data.image);//almaceno el nombre de la imagen
  }

  deleteFotoPerfil(){
    this.anilloService.deleteFoto(this.anilloForm.value['id']).subscribe(response => {
      Swal.fire(response['msg']['summary'], response['msg']['detail'], 'success');
      this.ngOnInit();
    }, error => {
      Swal.fire('Error al eliminar', 'Intente de nuevo', 'error');
    });
  }



  editAnillo(){
    this.submitted = true;

    const formData = new FormData();
    formData.append('title', this.anilloForm.get('title').value);
    formData.append('price', this.anilloForm.get('price').value);
    formData.append('model', this.anilloForm.get('model').value);
    formData.append('description', this.anilloForm.get('description').value);
    formData.append('user_id', this.anilloForm.get('user_id').value);
    formData.append('image', this.anilloForm.get('image').value);
    formData.append('status', 'PENDING');

    const id = this.anilloForm.get('id').value;

    if(id){
      //actualizar
      const data = {
        ...this.anilloForm.value,
        user_id: this.user.id
      }

      this.anilloService.updateAnillo(data, +id).subscribe(
        res =>{
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.anilloSeleccionado = res;
            Swal.fire('Actualizado', `Actualizado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/anillos`);
          }
        },
        error => this.error = error
        );

    }else{
      //crear
    const data = {
      ...this.anilloForm.value,
      user_id: this.user.id
    }
      this.anilloService.createAnillo(data).subscribe(
        (res: any) =>{
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.anilloSeleccionado = res;
            Swal.fire('Creado', ` creado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/anillos`);
          }
      },
      error => this.error = error
      );

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
