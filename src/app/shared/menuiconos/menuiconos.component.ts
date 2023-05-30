import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menuiconos',
  templateUrl: './menuiconos.component.html',
  styleUrls: ['./menuiconos.component.css']
})
export class MenuiconosComponent implements OnInit {

  public user: User;

  error: string;
  roleid:number;
  id:number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
  ) {
    this.user = this.userService.user;
  }


  ngOnInit(): void {
    this.getUser();

  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));


  }




}
