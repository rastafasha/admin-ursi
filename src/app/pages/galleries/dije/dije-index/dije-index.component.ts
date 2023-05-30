import { HttpBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user';
import { Dije } from 'src/app/models/dije';
import { DijeService } from 'src/app/services/dije.service';

@Component({
  selector: 'app-dije-index',
  templateUrl: './dije-index.component.html',
  styleUrls: ['./dije-index.component.css']
})
export class DijeIndexComponent implements OnInit {

  title = "Dijes"
  dijes: Dije;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;

  constructor(
    private location: Location,
    private dijeService: DijeService,
    handler: HttpBackend
  ) {
   }

  ngOnInit(): void {
    this.getDijes();
    window.scrollTo(0,0);
  }

  getDijes(): void {
    // return this.planesService.carga_info();
    this.dijeService.getDijes().subscribe(
      res =>{
        this.dijes = res;
        error => this.error = error
        // console.log(this.dijes);
      }
    );
  }

  eliminarDije(dije:Dije){
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
        this.dijeService.deleteDije(dije).subscribe(
          response =>{
            this.getDijes();
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

  cambiarStatus(dije:Dije){
    this.dijeService.updateStatus(dije).subscribe(
      resp =>{ console.log(resp);
        Swal.fire('Actualizado', `actualizado correctamente`, 'success');
        this.getDijes();
      }
    )
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
