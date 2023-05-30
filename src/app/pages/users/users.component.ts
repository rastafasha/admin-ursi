import { Component, OnInit } from '@angular/core';

import { HttpBackend, HttpClient, HttpHandler } from '@angular/common/http';

import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import { FileSaverService } from 'ngx-filesaver';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  title = "Usuarios"

  loading = false;
  usersCount = 0;
  usuarios: any;
  user: User;
  roles;

  p: number = 1;
  count: number = 8;
  query:string ='';

  error: string;
  msm_error: string;

  constructor(
    private userService: UserService,
    private location: Location,
    private http: HttpClient,
    handler: HttpBackend,
    private fileSaver: FileSaverService
    ) {
      this.http = new HttpClient(handler);
    }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.closeMenu();
    this.getUsers();
    this.getUser();
  }

  getUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }



  getUsers(): void {
    this.userService.getAll().subscribe(
      res =>{
        this.usuarios = res;
        error => this.error = error;
      }
    );
  }



  // showDeleteConfirm(id: any) {
  //   this.confirmService.openConfirmDialog("Seguro que desea borrar este usuario?" + id, "Eliminar", this.proced, id.toString(),this);

  // }

  eliminarUser(user:User){
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
        this.userService.deleteById(user).subscribe(
          response =>{
            this.getUsers();
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

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }
  search() {
    return this.userService.search(this.query).subscribe(
      res=>{
        this.usuarios = res;
        if(!this.query){
          this.ngOnInit();
        }
      });
  }

  excelExport(){
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
    const EXCLE_EXTENSION = '.xlsx';

    this.getUsers();


    //custom code
    const worksheet = XLSX.utils.json_to_sheet(this.usuarios);

    const workbook = {
      Sheets:{
        'testingSheet': worksheet
      },
      SheetNames:['testingSheet']
    }

    const excelBuffer = XLSX.write(workbook, {bookType:'xlsx', type: 'array'});

    const blobData = new Blob([excelBuffer],{type: EXCEL_TYPE});

    this.fileSaver.save(blobData, "usuariosUrsi")

  }
  csvExport(){
    const CSV_TYPE = 'text/csv';
    const CSV_EXTENSION = '.csv';

    this.getUsers();


    //custom code
    const worksheet = XLSX.utils.json_to_sheet(this.usuarios);

    const workbook = {
      Sheets:{
        'testingSheet': worksheet
      },
      SheetNames:['testingSheet']
    }

    const excelBuffer = XLSX.write(workbook, {bookType:'csv', type: 'array'});

    const blobData = new Blob([excelBuffer],{type: CSV_TYPE});

    this.fileSaver.save(blobData, "usuariosUrsi")

  }







}
