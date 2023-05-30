import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-historialpagos',
  templateUrl: './user-historialpagos.component.html',
  styleUrls: ['./user-historialpagos.component.css']
})
export class UserHistorialpagosComponent implements OnInit {
  title = "Historial Mis Pagos";
  userProfile!: User;
  user: User;
  id:any;

  p: number = 1;
  count: number = 8;

  constructor(
    private location: Location,
    private alertService: AlertService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.userService.closeMenu();
    this.getUser();
  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    this.id = this.user.id;
    this.getUserProfile();


  }

  getUserProfile(){

    this.userService.getUserById(this.id).subscribe((data: any) => {
      this.userProfile = data[0];
      // console.log('userProfile',this.userProfile)
    });
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }




}
