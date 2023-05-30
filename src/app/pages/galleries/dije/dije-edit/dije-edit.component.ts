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
import { Dije } from 'src/app/models/dije';
import { DijeService } from 'src/app/services/dije.service';

@Component({
  selector: 'app-dije-edit',
  templateUrl: './dije-edit.component.html',
  styleUrls: ['./dije-edit.component.css']
})
export class DijeEditComponent implements OnInit {

  /**
   * Editor type area wyswyg
   */
  public Editor = DecoupledEditor;
  public editorData = `<p>This is a CKEditor 5 WYSIWYG editor instance created with Angular.</p>`;


  public dijeForm: FormGroup;

  public dije: Dije;

  public imgSelect : String | ArrayBuffer;

  titlePage: string;

  public anilloSeleccionado: Dije;
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
      url: environment.apiUrl + '/dije/upload',
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
    private dijeService: DijeService,
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
      this.titlePage = 'Editando dije';
      this.dijeService.getDije(+id).subscribe(
        res => {
          this.dijeForm.patchValue({
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
      this.titlePage = 'Creando dije';
    }
  }

  validarFormulario(){
    this.dijeForm = this.fb.group({
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
    return this.dijeForm.get('title');
  }

  get description() {
    return this.dijeForm.get('description');
  }
  get price() {
   return this.dijeForm.get('price');
 }
  get model() {
    return this.dijeForm.get('model');
  }


  get status() {
    return this.dijeForm.get('status');
  }
  get image() {
    return this.dijeForm.get('image');
  }

  get user_id() {
    return this.dijeForm.get('user_id');
  }


  avatarUpload(datos) {
    const data = JSON.parse(datos.response);
    this.dijeForm.controls['image'].setValue(data.image);//almaceno el nombre de la imagen
  }

  deleteFotoPerfil(){
    this.dijeService.deleteFoto(this.dijeForm.value['id']).subscribe(response => {
      Swal.fire(response['msg']['summary'], response['msg']['detail'], 'success');
      this.ngOnInit();
    }, error => {
      Swal.fire('Error al eliminar', 'Intente de nuevo', 'error');
    });
  }



  editCurso(){

    const formData = new FormData();
    formData.append('title', this.dijeForm.get('title').value);
    formData.append('price', this.dijeForm.get('price').value);
    formData.append('model', this.dijeForm.get('model').value);
    formData.append('description', this.dijeForm.get('description').value);
    formData.append('user_id', this.dijeForm.get('user_id').value);
    formData.append('image', this.dijeForm.get('image').value);
    formData.append('status', 'PENDING');

    const id = this.dijeForm.get('id').value;

    if(id){
      //actualizar
      const data = {
        ...this.dijeForm.value,
        user_id: this.user.id
      }

      this.dijeService.updateDije(data, +id).subscribe(
        resp =>{
          this.anilloSeleccionado = resp;
          Swal.fire('Actualizado', `Actualizado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/dijes`);
          // console.log(this.anilloSeleccionado);
        });

    }else{
      //crear
    const data = {
      ...this.dijeForm.value,
      user_id: this.user.id
    }
      this.dijeService.createDije(data).subscribe(
        (resp: any) =>{
          this.anilloSeleccionado = resp;
        Swal.fire('Creado', ` creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/dijes`);
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
