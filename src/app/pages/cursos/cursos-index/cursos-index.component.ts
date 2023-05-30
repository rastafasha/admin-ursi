import { HttpBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Curso } from 'src/app/models/curso';
import { User } from 'src/app/models/user';
import { CursoService } from 'src/app/services/curso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos-index',
  templateUrl: './cursos-index.component.html',
  styleUrls: ['./cursos-index.component.css']
})
export class CursosIndexComponent implements OnInit {

  title = "Cursos"
  cursos: any;
  curso: Curso;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;
  query:string ='';


  constructor(
    private location: Location,
    private cursoService: CursoService,
    handler: HttpBackend
  ) {
   }

  ngOnInit(): void {
    this.getCursos();
    window.scrollTo(0,0);
  }

  getCursos(): void {
    // return this.planesService.carga_info();
    this.cursoService.getCursos().subscribe(
      res =>{
        this.cursos = res;
        error => this.error = error
        // console.log(this.cursos);
      }
    );
  }

  eliminarCurso(curso:Curso){
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
        this.cursoService.deleteCurso(curso).subscribe(
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

  cambiarStatus(curso:Curso){
    this.cursoService.updateStatus(curso).subscribe(
      resp =>{
        // console.log(resp);
        Swal.fire('Actualizado', `actualizado correctamente`, 'success');
        this.getCursos();
      }
    )
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  search() {
    return this.cursoService.search(this.query).subscribe(
      res=>{
        this.cursos = res;
        if(!this.query){
          this.ngOnInit();
        }
      });
  }

}
