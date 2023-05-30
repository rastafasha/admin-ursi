import { HttpBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';
import { Escuela } from 'src/app/models/escuela';
import { EscuelaService } from 'src/app/services/escuela.service';
import { ExpocafService } from 'src/app/services/expocaf.service';
import { Expocaf } from 'src/app/models/expocaf';

@Component({
  selector: 'app-expocaf-index',
  templateUrl: './expocaf-index.component.html',
  styleUrls: ['./expocaf-index.component.css']
})
export class ExpocafIndexComponent implements OnInit {

  title = "Expo CAF"
  expocafs: Expocaf;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;

  constructor(
    private location: Location,
    private espocafService: ExpocafService,
    handler: HttpBackend
  ) {
   }

  ngOnInit(): void {
    this.getCursos();
    window.scrollTo(0,0);
  }

  getCursos(): void {
    // return this.planesService.carga_info();
    this.espocafService.getExpocafs().subscribe(
      res =>{
        this.expocafs = res;
        error => this.error = error
        // console.log(this.expocafs);
      }
    );
  }

  eliminarCurso(expocaf:Expocaf){
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
        this.espocafService.deleteExpocaf(expocaf).subscribe(
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

  cambiarStatus(expocaf:Expocaf){
    this.espocafService.updateStatus(expocaf).subscribe(
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
