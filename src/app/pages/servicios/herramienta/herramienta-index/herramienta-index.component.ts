import { HttpBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';
import { Herramienta } from 'src/app/models/herramienta';
import { HerramientaService } from 'src/app/services/herramienta.service';

@Component({
  selector: 'app-herramienta-index',
  templateUrl: './herramienta-index.component.html',
  styleUrls: ['./herramienta-index.component.css']
})
export class HerramientaIndexComponent implements OnInit {


  title = "Herramientas"
  herramientas: Herramienta;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;

  constructor(
    private location: Location,
    private herramientaService: HerramientaService,
    handler: HttpBackend
  ) {
   }

  ngOnInit(): void {
    this.getServicios();
    window.scrollTo(0,0);
  }

  getServicios(): void {
    // return this.planesService.carga_info();
    this.herramientaService.getHerramientas().subscribe(
      res =>{
        this.herramientas = res;
        error => this.error = error
        // console.log(this.herramientas);
      }
    );
  }

  eliminarCurso(herramienta:Herramienta){
    this.herramientaService.deleteHerramienta(herramienta).subscribe(
      response =>{
        this.getServicios();
      },
      error=>{
        this.msm_error = 'No se pudo eliminar, vuelva a intentar.'
      }
      );
      this.ngOnInit();
  }

  cambiarStatus(herramienta:Herramienta){
    this.herramientaService.updateStatus(herramienta).subscribe(
      resp =>{
        // console.log(resp);
        Swal.fire('Actualizado', `actualizado correctamente`, 'success');
        this.getServicios();
      }
    )
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
