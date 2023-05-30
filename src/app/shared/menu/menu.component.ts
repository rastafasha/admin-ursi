import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';


// import * as $ from 'jquery';
//declare function init_plugins();

declare var $: any;
declare var jQuery: any;



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: []
})


export class MenuComponent implements OnInit {

  @ViewChild('sidenav') sidenav;

  public user: User;

  error: string;
  id: any;
  roleid:number;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
  ) {
    this.user = userService.user;
   }

  ngOnInit(): void {
    this.getUser();
  }


  toggleNav(){
    this.sidenav.toggle();
  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    this.id = this.user.id;
    // this.activatedRoute.params.subscribe( ({id}) => this.getUserProfile(id));
  }

  getUserProfile(id:number){
    this.userService.getUserById(id).subscribe((data: any) => {
      this.user = data;
      console.log(this.user)
    });
  }


  logout(): void {
    this.accountService.logout();
  }

}
