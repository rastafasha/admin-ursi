import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { Payment } from 'src/app/models/payment';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';
import { PaymentService } from 'src/app/services/payment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  title = "Detalles de la cuenta";
  user: User;
  userprofile: User;
  error: string;
  payments: Payment;
  id:number;

  rolesSelected:number;

  p: number = 1;
  count: number = 8;

  constructor(
    private userService: UserService,
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private alertService: AlertService,

  ) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.closeMenu();
    this.activatedRoute.params.subscribe( ({id}) => this.getUserRemoto(id));
    // this.activatedRoute.params.subscribe( ({id}) => this.getDirectory(id));
  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    // return this.userService.getUserLocalStorage();
    // console.log(this.user);


  }

  getUserRemoto(id:number){
    this.userService.getUserById(+id).subscribe(
      res =>{
        this.user = res[0];
        error => this.error = error
        // console.log(this.userprofile);
      }
    );


  }

  getDirectory(id:number): void {
    // id = this.directory.user_id;

    // this.directorioService.getDirectorio(id).subscribe(
    //   res =>{
    //     this.directory = res;
    //     error => this.error = error;
    //     console.log(this.directory);
    //   }
    // );
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  updateUser(user: User){
    this.userService.update(user).subscribe(
      resp =>{ console.log(resp);
        Swal.fire('Actualizado', `actualizado correctamente`, 'success');
        this.enviarNotificacion();

      }
    )
  }

  enviarNotificacion(): void {
    this.alertService.success("Mensaje de Usuario","Usuario verificado, Nuevo Miembro!");
  }




}
