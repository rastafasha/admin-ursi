import { Component, OnInit, ViewChild } from '@angular/core';
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

import { Herramienta } from 'src/app/models/herramienta';
import { HerramientaService } from 'src/app/services/herramienta.service';
@Component({
  selector: 'app-herramienta-edit',
  templateUrl: './herramienta-edit.component.html',
  standalone: false,
  styleUrls: ['./herramienta-edit.component.css']
})
export class HerramientaEditComponent implements OnInit {
  
  option_selectedd: number = 1;
  solicitud_selectedd: any = null;
  
  public servicioForm: FormGroup;

  public herramienta: Herramienta;

  public imgSelect: String | ArrayBuffer;

  titlePage: string;

  public herramientaSeleccionado: Herramienta;
  public user: User;
  id: any;

  imageUrl = environment.apiUrlMedia;
  public FILE_AVATAR: any;
  public IMAGE_PREVISUALIZA: any = "assets/images/no-image.png";
  text_validation: any = null;
  public loading: boolean = false;

  imagePath: string;
  error: string;
  uploadError: string;


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
    this.activatedRoute.params.subscribe(({ id }) => this.getHerramienta(id));
    window.scrollTo(0, 0);
  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    // this.activatedRoute.params.subscribe( ({id}) => this.getUserProfile(id));
    if (!this.user || !this.user.id || this.user.id == null || this.user.id == undefined) {
      this.router.navigateByUrl('/login');

    }
    this.id = this.user.id;
  }

  getHerramienta(id: number) {
    if (id !== null && id !== undefined) {
      this.titlePage = 'Editando Herramienta';
      this.herramientaService.getHerramienta(+id).subscribe(
        res => {
          this.servicioForm.patchValue({
            id: res.id,
            title: res.title,
            subtitle: res.subtitle,
            description: res.description,
            title_eng: res.title_eng,
            subtitle_eng: res.subtitle_eng,
            description_eng: res.description_eng,
            status: res.status,
          });
          // Update editor data with existing content
          // this.editorData = res.description || '<p></p>';
          // this.editorData1 = res.description_eng || '<p></p>';
          this.imagePath = res.avatar;
          this.herramientaSeleccionado = res;
          // console.log(this.servicioSeleccionado);
        }
      );
    } else {
      this.titlePage = 'Creando Herramienta';
    }
  }

  validarFormulario() {
    this.servicioForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      subtitle: [''],
      description: ['', Validators.required],
      title_eng: [''],
      subtitle_eng: [''],
      description_eng: [''],
      status: ['PENDING'],
      image: [''],
    })
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


  get title() {
    return this.servicioForm.get('title');
  }

  get subtitle() {
    return this.servicioForm.get('subtitle');
  }

  get description() {
    return this.servicioForm.get('description');
  }
  get title_eng() {
    return this.servicioForm.get('title_eng');
  }

  get subtitle_eng() {
    return this.servicioForm.get('subtitle_eng');
  }

  get description_eng() {
    return this.servicioForm.get('description_eng');
  }

  get status() {
    return this.servicioForm.get('status');
  }
  


  editHerramienta() {

    const formData = new FormData();
    formData.append('title', this.servicioForm.get('title').value);
    formData.append('subtitle', this.servicioForm.get('subtitle').value);
    formData.append('description', this.servicioForm.get('description').value);
    formData.append('title_eng', this.servicioForm.get('title_eng').value);
    formData.append('subtitle_eng', this.servicioForm.get('subtitle_eng').value);
    formData.append('description_eng', this.servicioForm.get('description_eng').value);
    formData.append('status', 'PENDING');

    if (this.FILE_AVATAR) {
          formData.append("imagen", this.FILE_AVATAR);
        }
    
    const id = this.servicioForm.get('id').value;

    if (id) {
      // Update existing herramienta - send formData directly
      this.herramientaService.updateHerramienta(formData, +id).subscribe(
        resp => {
          this.herramientaSeleccionado = resp;
          Swal.fire('Actualizado', `Actualizado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/herramientas`);
        },
        err => {
          console.error('Error updating herramienta:', err);
          Swal.fire('Error', `Error al actualizar: ${err.message || 'Unknown error'}`, 'error');
        });

    } else {
      // Create new herramienta - also use formData
      this.herramientaService.createHerramienta(formData).subscribe(
        (resp: any) => {
          this.herramientaSeleccionado = resp;
          Swal.fire('Creado', `creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/herramientas`);
        },
        err => {
          console.error('Error creating herramienta:', err);
          Swal.fire('Error', `Error al crear: ${err.message || 'Unknown error'}`, 'error');
        });
    }
    return false;
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }



  //ckeditor

  public onReady(editor) {
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


  optionSelected(value: number) {
    this.option_selectedd = value;
    if (this.option_selectedd === 1) {
      // this.ngOnInit();
    }
    if (this.option_selectedd === 2) {
      this.solicitud_selectedd = null;
    }
  }

}
