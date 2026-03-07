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

import { Anillo } from 'src/app/models/anillo';
import { AnilloService } from 'src/app/services/anillo.service';

@Component({
  selector: 'app-anillo-edit',
  templateUrl: './anillo-edit.component.html',
  standalone: false,
  styleUrls: ['./anillo-edit.component.css']
})
export class AnilloEditComponent implements OnInit {

 
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

 imageUrl = environment.apiUrlMedia;
  public FILE_AVATAR: any;
  public IMAGE_PREVISUALIZA: any = "assets/images/no-image.png";
  text_validation: any = null;
  public loading: boolean = false;

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
           this.imagePath = res.avatar;
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


  editAnillo(){
    this.submitted = true;

    const formData = new FormData();
    formData.append('title', this.anilloForm.get('title').value);
    formData.append('price', this.anilloForm.get('price').value);
    formData.append('model', this.anilloForm.get('model').value);
    formData.append('description', this.anilloForm.get('description').value);
    
    formData.append('status', 'PENDING');
    if (this.FILE_AVATAR) {
          formData.append("imagen", this.FILE_AVATAR);
        }

    const id = this.anilloForm.get('id').value;

    if(id){
      //actualizar
      
      this.anilloService.updateAnillo(formData, +id).subscribe(
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
    
      this.anilloService.createAnillo(formData).subscribe(
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
