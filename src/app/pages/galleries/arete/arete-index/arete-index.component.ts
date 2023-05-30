import { HttpBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user';
import { Arete } from 'src/app/models/arete';
import { AreteService } from 'src/app/services/arete.service';

@Component({
  selector: 'app-arete-index',
  templateUrl: './arete-index.component.html',
  styleUrls: ['./arete-index.component.css']
})
export class AreteIndexComponent implements OnInit {


  title = "Aretes"
  aretes: Arete;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;

  constructor(
    private location: Location,
    private areteService: AreteService,
    handler: HttpBackend
  ) {
   }

  ngOnInit(): void {
    this.getAretes();
    window.scrollTo(0,0);
  }

  getAretes(): void {
    // return this.planesService.carga_info();
    this.areteService.getAretes().subscribe(
      res =>{
        this.aretes = res;
        error => this.error = error
        // console.log(this.aretes);
      }
    );
  }

  eliminarArete(arete:Arete){
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
        this.areteService.deleteArete(arete).subscribe(
          response =>{
            this.getAretes();
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

  cambiarStatus(arete:Arete){
    this.areteService.updateStatus(arete).subscribe(
      resp =>{ console.log(resp);
        Swal.fire('Actualizado', `actualizado correctamente`, 'success');
        this.getAretes();
      }
    )
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
