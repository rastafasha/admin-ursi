import { HttpBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user';
import { Anillo } from 'src/app/models/anillo';
import { AnilloService } from 'src/app/services/anillo.service';


@Component({
  selector: 'app-anillo-index',
  templateUrl: './anillo-index.component.html',
  styleUrls: ['./anillo-index.component.css']
})
export class AnilloIndexComponent implements OnInit {

  title = "Anillos"
  anillos: Anillo;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;

  constructor(
    private location: Location,
    private anilloService: AnilloService,
    handler: HttpBackend
  ) {
   }

  ngOnInit(): void {
    this.getAnillos();
    window.scrollTo(0,0);
  }

  getAnillos(): void {
    // return this.planesService.carga_info();
    this.anilloService.getAnillos().subscribe(
      res =>{
        this.anillos = res;
        error => this.error = error
        // console.log(this.anillos);
      }
    );
  }

  eliminarAnillo(anillo:Anillo){
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
        this.anilloService.deleteAnillo(anillo).subscribe(
          response =>{
            this.getAnillos();
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

  cambiarStatus(anillo:Anillo){
    this.anilloService.updateStatus(anillo).subscribe(
      resp =>{
        // console.log(resp);
        Swal.fire('Actualizado', `actualizado correctamente`, 'success');
        this.getAnillos();
      }
    )
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
