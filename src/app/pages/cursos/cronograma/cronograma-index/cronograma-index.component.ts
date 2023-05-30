import { HttpBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';
import { Cronograma } from 'src/app/models/cronograma';
import { CronogramaService } from 'src/app/services/cronograma.service';

@Component({
  selector: 'app-cronograma-index',
  templateUrl: './cronograma-index.component.html',
  styleUrls: ['./cronograma-index.component.css']
})
export class CronogramaIndexComponent implements OnInit {


  title = "Cronograma de Cursos"
  cronologiacursos: Cronograma;
  cronologiacurso: Cronograma;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;

  constructor(
    private location: Location,
    private cronogramaService: CronogramaService,
    handler: HttpBackend
  ) {
   }

  ngOnInit(): void {
    this.getCursos();
    window.scrollTo(0,0);
  }

  getCursos(): void {
    // return this.planesService.carga_info();
    this.cronogramaService.getCronogramas().subscribe(
      res =>{
        this.cronologiacursos = res;
        error => this.error = error
        // console.log(this.cronologiacursos);
      }
    );
  }

  eliminarCurso(cronologiacurso:Cronograma){
    this.cronogramaService.deleteCronograma(cronologiacurso).subscribe(
      response =>{
        this.getCursos();
      },
      error=>{
        this.msm_error = 'No se pudo eliminar, vuelva a intentar.'
      }
      );
      this.ngOnInit();
  }

  deleteFotoPerfil(){
    this.cronogramaService.deleteFoto(this.cronologiacurso.id).subscribe(response => {
      Swal.fire(response['msg']['summary'], response['msg']['detail'], 'success');
      this.ngOnInit();
    }, error => {
      Swal.fire('Error al eliminar', 'Intente de nuevo', 'error');
    });
  }



  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


}
