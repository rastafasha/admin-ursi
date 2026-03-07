import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Escuela } from 'src/app/models/escuela';
import { EscuelaService } from 'src/app/services/escuela.service';
const baseUrl = environment.apiUrl;

@Component({
  selector: 'app-escuela-edit',
  templateUrl: './escuela-edit.component.html',
  standalone: false,
  styleUrls: ['./escuela-edit.component.css']
})
export class EscuelaEditComponent implements OnInit {


  public cursoForm: FormGroup;

  public curso: Escuela;

  public imgSelect : String | ArrayBuffer;

  titlePage: string;

  public escuelaSeleccionado: Escuela;
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
    private escuelaService: EscuelaService,
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
      this.titlePage = 'Editando Escuela';
      this.escuelaService.getEscuela(+id).subscribe(
        res => {
          this.cursoForm.patchValue({
            id: res.id,
            title: res.title,
          });
          this.escuelaSeleccionado = res;
          this.imagePath = res.avatar;
          // console.log(this.escuelaSeleccionado);
        }
      );
    } else {
      this.titlePage = 'Creando Escuela';
    }
  }

  validarFormulario(){
    this.cursoForm = this.fb.group({
      id: [''],
      title: [''],
      image: [''],
      user_id: [' '],
    })
  }

  get title() {
    return this.cursoForm.get('title');
  }
  get image() {
    return this.cursoForm.get('image');
  }

  get user_id() {
    return this.cursoForm.get('user_id');
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
    
    if (this.FILE_AVATAR) {
          formData.append("imagen", this.FILE_AVATAR);
        }
    const id = this.cursoForm.get('id').value;

    if(id){
      //actualizar
      

      this.escuelaService.updateEscuela(formData, +id).subscribe(
        resp =>{
          this.escuelaSeleccionado = resp;
          Swal.fire('Actualizado', `Actualizado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/escuela`);
          // console.log(this.escuelaSeleccionado);
        });

    }else{
      //crear
      this.escuelaService.createEscuela(formData).subscribe(
        (resp: any) =>{
          this.escuelaSeleccionado = resp;
        Swal.fire('Creado', ` creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/escuela`);
        // this.enviarNotificacion();
      });
    }
    return false;
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
