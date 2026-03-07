import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Publicacion } from 'src/app/models/publicacion';
import { PublicacionService } from 'src/app/services/publicacion.service';
const baseUrl = environment.apiUrl;

@Component({
  selector: 'app-publicacion-edit',
  templateUrl: './publicacion-edit.component.html',
  standalone: false,
  styleUrls: ['./publicacion-edit.component.css']
})
export class PublicacionEditComponent implements OnInit {


  public cursoForm: FormGroup;

  public curso: Publicacion;

  public imgSelect : String | ArrayBuffer;

  titlePage: string;

  public escuelaSeleccionado: Publicacion;
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


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private publicacionService: PublicacionService,
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
      this.titlePage = 'Editando Publicación';
      this.publicacionService.getPublicacion(+id).subscribe(
        res => {
          this.cursoForm.patchValue({
            id: res.id,
            status: res.status,
          });
          this.escuelaSeleccionado = res;
          this.imagePath = res.avatar;
          // console.log(this.escuelaSeleccionado);
        }
      );
    } else {
      this.titlePage = 'Creando Publicación';
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
    
    formData.append('status', 'PENDING');
    if (this.FILE_AVATAR) {
          formData.append("imagen", this.FILE_AVATAR);
        }

    const id = this.cursoForm.get('id').value;

    if(id){
      //actualizar
      

      this.publicacionService.updatePublicacion(formData, +id).subscribe(
        resp =>{
          this.escuelaSeleccionado = resp;
          Swal.fire('Actualizado', `Actualizado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/publicaciones`);
          // console.log(this.escuelaSeleccionado);
        });

    }else{
      //crear
    
      this.publicacionService.createPublicacion(formData).subscribe(
        (resp: any) =>{
          this.escuelaSeleccionado = resp;
        Swal.fire('Creado', ` creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/publicaciones`);
        // this.enviarNotificacion();
      });
    }
    return false;
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


}
