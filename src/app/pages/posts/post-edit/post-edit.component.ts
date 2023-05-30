import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AccountService } from 'src/app/services/account.service';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { CategoryService } from 'src/app/services/category.service';
import { PostService } from 'src/app/services/post.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

//ckeditor
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
const baseUrl = environment.apiUrl;

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  /**
   * Editor type area wyswyg
   */
  public Editor = DecoupledEditor;
  public editorData = `<p>This is a CKEditor 5 WYSIWYG editor instance created with Angular.</p>`;


  public postForm: FormGroup;

  public post: Post;

  public imgSelect : String | ArrayBuffer;
  public categories: Category;

  titlePage: string;

  public postSeleccionado: Post;
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
      url: environment.apiUrl + '/post/upload',
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
    private postService: PostService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private accountService: AccountService,
    private userService: UserService,
    ) {
      this.user = this.userService.user;
     }

  ngOnInit(): void {
    this.getCategories();
    this.validarFormulario();
    this.getUser();
    this.activatedRoute.params.subscribe( ({id}) => this.getPost(id));
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

  getPost(id: number){
    if (id !== null && id !== undefined) {
      this.titlePage = 'Editando Blog';
      this.postService.getPost(+id).subscribe(
        res => {
          this.postForm.patchValue({
            id: res.id,
            title: res.title,
            description: res.description,
            slug: res.slug,
            category_id: this.categories.id,
            isFeatured: res.isFeatured,
            status: res.status,
            user_id: res.user_id,
          });
          this.postSeleccionado = res;
          // console.log(this.postSeleccionado);
        }
      );
    } else {
      this.titlePage = 'Creando Blog';
    }
  }

  validarFormulario(){
    this.postForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: [''],
      slug: [''],
      status: ['PENDING'],
      image: [''],
      isFeatured: [''],
      category_id: [''],
      user_id: [' '],
    })
  }
  get title() {
    return this.postForm.get('title');
  }

  get description() {
    return this.postForm.get('description');
  }
  get slug() {
    return this.postForm.get('slug');
  }

  get category_id() {
    return this.postForm.get('category_id');
  }

  get status() {
    return this.postForm.get('status');
  }
  get image() {
    return this.postForm.get('image');
  }
  get isFeatured() {
    return this.postForm.get('isFeatured');
  }
  get user_id() {
    return this.postForm.get('user_id');
  }


  avatarUpload(datos) {
    const data = JSON.parse(datos.response);
    this.postForm.controls['image'].setValue(data.image);//almaceno el nombre de la imagen
  }

  deleteFotoPerfil(){
    this.postService.deleteFoto(this.postForm.value['id']).subscribe(response => {
      Swal.fire(response['msg']['summary'], response['msg']['detail'], 'success');
      this.ngOnInit();
    }, error => {
      Swal.fire('Error al eliminar', 'Intente de nuevo', 'error');
    });
  }



  editPost(){

    const formData = new FormData();
    formData.append('title', this.postForm.get('title').value);
    formData.append('description', this.postForm.get('description').value);
    formData.append('slug', this.postForm.get('slug').value);
    formData.append('category_id', this.postForm.get('category_id').value);
    formData.append('isFeatured', this.postForm.get('isFeatured').value);
    formData.append('status', 'PENDING');
    formData.append('image', this.postForm.get('image').value);
    formData.append('user_id', this.postForm.get('user_id').value);

    const id = this.postForm.get('id').value;

    if(id){
      //actualizar
      const data = {
        ...this.postForm.value,
        user_id: this.user.id
      }

      this.postService.updatePost(data, +id).subscribe(
        resp =>{
          this.postSeleccionado =resp;
          Swal.fire('Actualizado', `Actualizado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/posts`);
          // console.log(this.postSeleccionado);
        });

    }else{
      //crear
    const data = {
      ...this.postForm.value,
      user_id: this.user.id
    }
      this.postService.createPost(data).subscribe(
        (resp: any) =>{
          this.postSeleccionado =resp;
        Swal.fire('Creado', ` creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/posts`);
        // this.enviarNotificacion();
      });
    }
    return false;
  }





  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      res =>{
        this.categories = res;
      }
    );
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
    uploadUrl: 'https://ursigalletti.net/backend-api-daniel/public/api/post/upload/',

    // Enable the XMLHttpRequest.withCredentials property.
    withCredentials: true,

    // Headers sent along with the XMLHttpRequest to the upload server.

  }




}
