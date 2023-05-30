import { HttpBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';
import { Escuela } from 'src/app/models/escuela';
import { EscuelaService } from 'src/app/services/escuela.service';

@Component({
  selector: 'app-escuela-index',
  templateUrl: './escuela-index.component.html',
  styleUrls: ['./escuela-index.component.css']
})
export class EscuelaIndexComponent implements OnInit {

  title = "Escuela y Ursi Galletti"
  escuelas: Escuela;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;

  constructor(
    private location: Location,
    private escuelaService: EscuelaService,
    handler: HttpBackend
  ) {
   }

  ngOnInit(): void {
    this.getCursos();
    window.scrollTo(0,0);
  }

  getCursos(): void {
    // return this.planesService.carga_info();
    this.escuelaService.getEscuelas().subscribe(
      res =>{
        this.escuelas = res;
        error => this.error = error
        // console.log(this.escuelas);
      }
    );
  }

  eliminarCurso(escuela:Escuela){
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
        this.escuelaService.deleteEscuela(escuela).subscribe(
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



  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
