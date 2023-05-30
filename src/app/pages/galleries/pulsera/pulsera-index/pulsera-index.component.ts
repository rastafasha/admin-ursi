import { HttpBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user';
import { Pulsera } from 'src/app/models/pulsera';
import { PulseraService } from 'src/app/services/pulsera.service';

@Component({
  selector: 'app-pulsera-index',
  templateUrl: './pulsera-index.component.html',
  styleUrls: ['./pulsera-index.component.css']
})
export class PulseraIndexComponent implements OnInit {

  title = "Pulseras"
  pulseras: Pulsera;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;

  constructor(
    private location: Location,
    private pulseraService: PulseraService,
    handler: HttpBackend
  ) {
   }

  ngOnInit(): void {
    this.getPulseras();
    window.scrollTo(0,0);
  }

  getPulseras(): void {
    // return this.planesService.carga_info();
    this.pulseraService.getPulseras().subscribe(
      res =>{
        this.pulseras = res;
        error => this.error = error
        // console.log(this.pulseras);
      }
    );
  }

  eliminarPulsera(pulsera:Pulsera){
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
        this.pulseraService.deletePulsera(pulsera).subscribe(
          response =>{
            this.getPulseras();
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

  cambiarStatus(pulsera:Pulsera){
    this.pulseraService.updateStatus(pulsera).subscribe(
      resp =>{ console.log(resp);
        Swal.fire('Actualizado', `actualizado correctamente`, 'success');
        this.getPulseras();
      }
    )
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
