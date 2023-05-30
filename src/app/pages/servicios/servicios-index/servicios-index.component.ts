import { HttpBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';
import { Servicios } from 'src/app/models/servicios';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-servicios-index',
  templateUrl: './servicios-index.component.html',
  styleUrls: ['./servicios-index.component.css']
})
export class ServiciosIndexComponent implements OnInit {


  title = "Servicios"
  services: Servicios;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;

  constructor(
    private location: Location,
    private servicioService: ServicioService,
    handler: HttpBackend
  ) {
   }

  ngOnInit(): void {
    this.getServicios();
    window.scrollTo(0,0);
  }

  getServicios(): void {
    // return this.planesService.carga_info();
    this.servicioService.getServicios().subscribe(
      res =>{
        this.services = res;
        error => this.error = error
        // console.log(this.servicios);
      }
    );
  }

  eliminarServicio(servicio:Servicios){
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
        this.servicioService.deleteServicio(servicio).subscribe(
          response =>{
            this.getServicios();
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

  cambiarStatus(servicio:Servicios){
    this.servicioService.updateStatus(servicio).subscribe(
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
