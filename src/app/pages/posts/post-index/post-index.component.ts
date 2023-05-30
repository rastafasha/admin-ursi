import { Component, OnInit } from '@angular/core';
import { HttpBackend, HttpClient, HttpHandler } from '@angular/common/http';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-post-index',
  templateUrl: './post-index.component.html',
  styleUrls: ['./post-index.component.css']
})
export class PostIndexComponent implements OnInit {

  title = "Blog"
  posts: Post;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;

  constructor(
    private location: Location,
    private postService: PostService,
    handler: HttpBackend
  ) {
   }

  ngOnInit(): void {
    this.getPosts();
    window.scrollTo(0,0);
  }

  getPosts(): void {
    // return this.planesService.carga_info();
    this.postService.getPosts().subscribe(
      res =>{
        this.posts = res;
        error => this.error = error
        // console.log(this.posts);
      }
    );
  }

  eliminarPost(post:Post){
    Swal.fire({
      title: 'Estas Seguro?',
      text: "No podras recuperarlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.postService.deletePost(post).subscribe(
          response =>{
            this.getPosts();
          }
          );
        Swal.fire(
          'Borrado!',
          'El Archivo fue borrado.',
          'success'
        )
        this.ngOnInit();
      }
    });
  }

  cambiarStatus(post:Post){
    this.postService.updateStatus(post).subscribe(
      resp =>{ console.log(resp);
        Swal.fire('Actualizado', `actualizado correctamente`, 'success');
        this.getPosts();
      }
    )
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
