import { HttpBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';
import { Publicacion } from 'src/app/models/publicacion';
import { PublicacionService } from 'src/app/services/publicacion.service';

@Component({
  selector: 'app-publicacion-index',
  templateUrl: './publicacion-index.component.html',
  styleUrls: ['./publicacion-index.component.css']
})
export class PublicacionIndexComponent implements OnInit {


  title = "Publicaciones"
  publicaciones: Publicacion;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;

  constructor(
    private location: Location,
    private publicacionService: PublicacionService,
    handler: HttpBackend
  ) {
   }

  ngOnInit(): void {
    this.getCursos();
    window.scrollTo(0,0);
  }

  getCursos(): void {
    // return this.planesService.carga_info();
    this.publicacionService.getPublicacions().subscribe(
      res =>{
        this.publicaciones = res;
        error => this.error = error
        // console.log(this.publicaciones);
      }
    );
  }

  eliminarCurso(publicacion:Publicacion){
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
        this.publicacionService.deletePublicacion(publicacion).subscribe(
          response =>{
            this.getCursos();
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

  cambiarStatus(publicacion:Publicacion){
    this.publicacionService.updateStatus(publicacion).subscribe(
      resp =>{ console.log(resp);
        Swal.fire('Actualizado', `actualizado correctamente`, 'success');
        this.getCursos();
      }
    )
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
