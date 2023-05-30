import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Joya } from 'src/app/models/joya';
import { JoyaService } from 'src/app/services/joya.service';
const baseUrl = environment.apiUrl;

@Component({
  selector: 'app-joya-edit',
  templateUrl: './joya-edit.component.html',
  styleUrls: ['./joya-edit.component.css']
})
export class JoyaEditComponent implements OnInit {


  public cursoForm: FormGroup;

  public curso: Joya;

  public imgSelect : String | ArrayBuffer;

  titlePage: string;

  public escuelaSeleccionado: Joya;
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
      url: environment.apiUrl + '/joya/upload',
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
    private joyaService: JoyaService,
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
      this.titlePage = 'Editando Joya';
      this.joyaService.getJoya(+id).subscribe(
        res => {
          this.cursoForm.patchValue({
            id: res.id,
            status: res.status,
          });
          this.escuelaSeleccionado = res;
          // console.log(this.escuelaSeleccionado);
        }
      );
    } else {
      this.titlePage = 'Creando Joya';
    }
  }

  validarFormulario(){
    this.cursoForm = this.fb.group({
      id: [''],
      status: ['PENDING'],
      image: [''],
      user_id: [' '],
    })
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


  avatarUpload(datos) {
    const data = JSON.parse(datos.response);
    this.cursoForm.controls['image'].setValue(data.image);//almaceno el nombre de la imagen
  }

  deleteFotoPerfil(){
    this.joyaService.deleteFoto(this.cursoForm.value['id']).subscribe(response => {
      Swal.fire(response['msg']['summary'], response['msg']['detail'], 'success');
      this.ngOnInit();
    }, error => {
      Swal.fire('Error al eliminar', 'Intente de nuevo', 'error');
    });
  }



  editCurso(){

    const formData = new FormData();
    formData.append('image', this.cursoForm.get('image').value);
    formData.append('status', 'PENDING');

    const id = this.cursoForm.get('id').value;

    if(id){
      //actualizar
      const data = {
        ...this.cursoForm.value,
        user_id: this.user.id
      }

      this.joyaService.updateJoya(data, +id).subscribe(
        resp =>{
          this.escuelaSeleccionado = resp;
          Swal.fire('Actualizado', `Actualizado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/joyas`);
          // console.log(this.escuelaSeleccionado);
        });

    }else{
      //crear
    const data = {
      ...this.cursoForm.value,
      user_id: this.user.id
    }
      this.joyaService.createJoya(data).subscribe(
        (resp: any) =>{
          this.escuelaSeleccionado = resp;
        Swal.fire('Creado', ` creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/joyas`);
        // this.enviarNotificacion();
      });
    }
    return false;
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
