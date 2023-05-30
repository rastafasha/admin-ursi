import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-roles-view',
  templateUrl: './roles-view.component.html',
  styleUrls: ['./roles-view.component.css']
})
export class RolesViewComponent implements OnInit {

   title = "Roles";
  users: User[] = [];
  user: User;

  p: number = 1;
  count: number = 8;

  error: string;
  msm_error: string;
  roles;

  rolesSelected:number;

  rolesForm: FormGroup;

  constructor(
    private fb:FormBuilder,
    private userService: UserService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.getUsers();
    window.scrollTo(0,0);
  }

  getUsers(): void {
    this.userService.getAll().subscribe(
      res =>{
        this.users = res;
        error => this.error = error;
      }
    );
  }


  getRoles(): void {

    this.userService.getAll().subscribe(
      res =>{
        this.user.role = res;
        error => this.error = error;
        console.log(this.user.role);
      }
    );
  }

  validarFormulario(){
    this.rolesForm = this.fb.group({
      role: [''],
    })
  }

  cambiarRole(user: User){
    this.userService.update(user).subscribe(
      resp =>{ console.log(resp);
        Swal.fire('Actualizado', `actualizado correctamente`, 'success');
        this.getUsers();
      }
    )
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
