import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
const baseUrl = environment.apiUrl;
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchItem: string ='';
  resultado:any;
  params = { } as any;
  users: any[]=[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  search(){debugger
    this.userService.search(this.params).subscribe({
      next: (res: any)=>{
        this.params = res;
        console.log(this.params);
      },
      error: (error: any)=>{
      }
    })
  }

}
