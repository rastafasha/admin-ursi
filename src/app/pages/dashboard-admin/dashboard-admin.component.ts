import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  title = 'Panel Administrativo';
  public user: User;
  public userprofile: User;

  error: string;
  id:any;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    this.user = userService.user;
  }

  ngOnInit(): void {

    this.closeMenu();
    this.getUser();
    window.scrollTo(0,0);
  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    // console.log(this.user);
    // console.log(this.user.id);
    this.id = this.user.id;
    // this.getUserRemoto(this.id);
    this.activatedRoute.params.subscribe( ({id}) => this.getUserProfile(id));


  }

  getUserProfile(id:any){
    id  = this.user.id
    this.userService.getUserById(id).subscribe(
      res =>{
        this.userprofile = res[0];
        error => this.error = error
        // console.log(this.userprofile);
      }
    );
  }




}
