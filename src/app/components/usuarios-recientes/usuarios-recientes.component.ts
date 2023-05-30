import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-usuarios-recientes',
  templateUrl: './usuarios-recientes.component.html',
  styleUrls: ['./usuarios-recientes.component.css']
})
export class UsuariosRecientesComponent implements OnInit {

  users: User;
  error: string;
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getRecentUsers();
  }

  getRecentUsers(): void {
    this.userService.getRecientes().subscribe(
      res =>{
        this.users = res;
        error => this.error = error
        console.log(this.users);
      }
    );
  }

}
