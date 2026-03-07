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
import { Arete } from 'src/app/models/arete';
import { AreteService } from 'src/app/services/arete.service';

@Component({
  selector: 'app-arete-edit',
  templateUrl: './arete-edit.component.html',
  standalone: false,
  styleUrls: ['./arete-edit.component.css']
})
export class AreteEditComponent implements OnInit {

  public areteForm: FormGroup;

  public arete: Arete;

  public imgSelect : String | ArrayBuffer;

  titlePage: string;

  public anilloSeleccionado: Arete;
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
    private areteService: AreteService,
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
      this.titlePage = 'Editando arete';
      this.areteService.getArete(+id).subscribe(
        res => {
          this.areteForm.patchValue({
            id: res.id,
            title: res.title,
            price: res.price,
            model: res.model,
            description: res.description,
            user_id: res.user_id,
            status: res.status,
          });
          this.anilloSeleccionado = res;
          this.imagePath = res.avatar;
          // console.log(this.anilloSeleccionado);
        }
      );
    } else {
      this.titlePage = 'Creando arete';
    }
  }

  validarFormulario(){
    this.areteForm = this.fb.group({
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
    return this.areteForm.get('title');
  }

  get description() {
    return this.areteForm.get('description');
  }
  get price() {
   return this.areteForm.get('price');
 }
  get model() {
    return this.areteForm.get('model');
  }


  get status() {
    return this.areteForm.get('status');
  }
  get image() {
    return this.areteForm.get('image');
  }

  get user_id() {
    return this.areteForm.get('user_id');
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
    formData.append('title', this.areteForm.get('title').value);
    formData.append('price', this.areteForm.get('price').value);
    formData.append('model', this.areteForm.get('model').value);
    formData.append('description', this.areteForm.get('description').value);
    formData.append('user_id', this.areteForm.get('user_id').value);
    formData.append('status', 'PENDING');
    if (this.FILE_AVATAR) {
          formData.append("imagen", this.FILE_AVATAR);
        }


    const id = this.areteForm.get('id').value;

    if(id){
      //actualizar
      

      this.areteService.updateArete(formData, +id).subscribe(
        resp =>{
          this.anilloSeleccionado = resp;
          Swal.fire('Actualizado', `Actualizado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/aretes`);
          // console.log(this.anilloSeleccionado);
        });

    }else{
      //crear
    
      this.areteService.createArete(formData).subscribe(
        (resp: any) =>{
          this.anilloSeleccionado = resp;
        Swal.fire('Creado', ` creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/aretes`);
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
