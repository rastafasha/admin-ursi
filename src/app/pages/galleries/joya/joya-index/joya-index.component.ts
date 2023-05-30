import { HttpBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';
import { Joya } from 'src/app/models/joya';
import { JoyaService } from 'src/app/services/joya.service';

@Component({
  selector: 'app-joya-index',
  templateUrl: './joya-index.component.html',
  styleUrls: ['./joya-index.component.css']
})
export class JoyaIndexComponent implements OnInit {

  title = "Joyas de la Gran Pantalla"
  joyas: Joya;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;

  constructor(
    private location: Location,
    private joyaService: JoyaService,
    handler: HttpBackend
  ) {
   }

  ngOnInit(): void {
    this.getCursos();
    window.scrollTo(0,0);
  }

  getCursos(): void {
    // return this.planesService.carga_info();
    this.joyaService.getJoyas().subscribe(
      res =>{
        this.joyas = res;
        error => this.error = error
        // console.log(this.joyas);
      }
    );
  }

  eliminarCurso(joya:Joya){
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
        this.joyaService.deleteJoya(joya).subscribe(
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

  cambiarStatus(joya:Joya){
    this.joyaService.updateStatus(joya).subscribe(
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
