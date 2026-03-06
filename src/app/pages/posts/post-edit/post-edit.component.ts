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

const baseUrl = environment.apiUrl;

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  standalone: false,
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

 
  public postForm: FormGroup;

  public post: Post;

  public imgSelect : String | ArrayBuffer;
  titlePage: string;

  public postSeleccionado: Post;
  public user: User;
  id:any;


  public categories: Category;
  public categorySeleccionado: Category;
  categoriaslista: Category;
  public msm_error = '';
  categoryForm: FormGroup;

option_selectedd:number = 1;
  solicitud_selectedd:any = null;

  userId:number;
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
      this.userId = this.user.id;
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
            title_eng: res.title_eng,
            description_eng: res.description_eng,
            slug: res.slug,
            category_id: res.category_id,
            isFeatured: res.isFeatured,
            status: res.status,
            user_id: res.user_id,
          });
          this.postSeleccionado = res;
          this.imagePath = res.avatar;
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
      title_eng: [''],
      description_eng: [''],
      category_id: [''],
      user_id: [' '],
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
    return this.postForm.get('title');
  }

  get description() {
    return this.postForm.get('description');
  }
  get title_eng() {
    return this.postForm.get('title_eng');
  }

  get description_eng() {
    return this.postForm.get('description_eng');
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



  editPost(){

    const formData = new FormData();
    formData.append('title', this.postForm.get('title').value);
    formData.append('description', this.postForm.get('description').value);
    formData.append('title_eng', this.postForm.get('title_eng').value);
    formData.append('description_eng', this.postForm.get('description_eng').value);
    formData.append('slug', this.postForm.get('slug').value);
    formData.append('category_id', this.postForm.get('category_id').value);
    formData.append('isFeatured', this.postForm.get('isFeatured').value);
    formData.append('user_id', this.userId.toString());
    formData.append('status', 'PENDING');
    
    if (this.FILE_AVATAR) {
         formData.append("imagen", this.FILE_AVATAR);
       }
    const id = this.postForm.get('id').value;

    if(id){
      //actualizar
     

      this.postService.updatePost(formData, +id).subscribe(
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
      this.postService.createPost(formData).subscribe(
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

  // get name() {
  //   return this.categoryForm.get('name');
  // }

  

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


optionSelected(value:number){
      this.option_selectedd = value;
      if(this.option_selectedd === 1){
        // this.ngOnInit();
      }
      if(this.option_selectedd === 2){
        this.solicitud_selectedd = null;
      }
    }




}
