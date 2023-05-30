import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {


  private linktTheme = document.querySelector('.dark');// se comunica el id pulsado


  userprofile!: any;
  public user: User;
  error: string;
  id:any;

  constructor(
    private userService: UserService,
    private authService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    ) {}



  ngOnInit() {
    this.getUser();
    this.getUserServer();
  }



  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    // this.activatedRoute.params.subscribe( ({id}) => this.getUserProfile(id));
    if(!this.user || !this.user.id || this.user.id == null || this.user.id == undefined){
      this.router.navigateByUrl('/login');
    }
      this.id = this.user.id;
    //verifica que se hallan logueado
    if(!this.user || !this.user.id){
      this.router.navigateByUrl('/login');
    }

  }

  getUserServer(){
    this.userService.getUserById(this.user.id).subscribe(
      res =>{
        this.user = res[0];
        error => this.error = error;
      }
    );

  }

  openModal(){

    var modalcart = document.getElementsByClassName("dropdown-menu");
      for (var i = 0; i<modalcart.length; i++) {
         modalcart[i].classList.toggle("show");

      }
  }

  openMenu(){

    var menuLateral = document.getElementsByClassName("mini-sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.toggle("show-sidebar");
        //console.log('pulsado', menuLateral);

      }
  }

  logout(){
    this.authService.logout();
  }

  darkmode(dark:string){
    let body = document.querySelector('body');
    let header = document.querySelector('header');
    let aside = document.querySelector('aside');

    const classExists = document.getElementsByClassName(
      'dark'
     ).length > 0;

    var dayNight = document.getElementsByClassName("dayNight");
      for (var i = 0; i<dayNight.length; i++) {
        dayNight[i].classList.toggle("active");
        body.classList.toggle('dark');
        header.classList.toggle('dark');
        aside.classList.toggle('dark');

      }
      // localStorage.setItem('dark', dark);

      if (classExists) {
        localStorage.removeItem('dark');
        // console.log('✅ class exists on page, removido');
      } else {
        localStorage.setItem('dark', dark);
        // console.log('⛔️ class does NOT exist on page, agregado');
      }
      // console.log('Pulsado');
  }




}
