import { HttpClient, HttpBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Orlando } from 'src/app/models/orlando';
import { User } from 'src/app/models/user';
import { OrlandoService } from 'src/app/services/orlando.service';

import { FileSaverService } from 'ngx-filesaver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-orlando-index',
  templateUrl: './orlando-index.component.html',
  styleUrls: ['./orlando-index.component.css']
})
export class OrlandoIndexComponent implements OnInit {

  title = "Evento Orlando 2023"
  orlandos: any;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;
  datos: any;

  constructor(
    private location: Location,
    private http: HttpClient,
    private orlandoService: OrlandoService,
    handler: HttpBackend,
    private fileSaver: FileSaverService
  ) {
    this.http = new HttpClient(handler);
   }

  ngOnInit(): void {
    this.getCurrencies();
    this.getUser();
    window.scrollTo(0,0);
  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    console.log(this.user.id);


  }

  getCurrencies(): void {
    this.orlandoService.getOrlandos().subscribe(
      res =>{
        this.orlandos = res;
        error => this.error = error
        // console.log(this.orlandos);
      }
    );
  }



  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }




  excelExport(){
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
    const EXCLE_EXTENSION = '.xlsx';

    this.getCurrencies();


    //custom code
    const worksheet = XLSX.utils.json_to_sheet(this.orlandos);

    const workbook = {
      Sheets:{
        'testingSheet': worksheet
      },
      SheetNames:['testingSheet']
    }

    const excelBuffer = XLSX.write(workbook, {bookType:'xlsx', type: 'array'});

    const blobData = new Blob([excelBuffer],{type: EXCEL_TYPE});

    this.fileSaver.save(blobData, "eventoOrlandoUrsi2023")

  }
  csvExport(){
    const CSV_TYPE = 'text/csv';
    const CSV_EXTENSION = '.csv';

    this.getCurrencies();


    //custom code
    const worksheet = XLSX.utils.json_to_sheet(this.orlandos);

    const workbook = {
      Sheets:{
        'testingSheet': worksheet
      },
      SheetNames:['testingSheet']
    }

    const excelBuffer = XLSX.write(workbook, {bookType:'csv', type: 'array'});

    const blobData = new Blob([excelBuffer],{type: CSV_TYPE});

    this.fileSaver.save(blobData, "eventoOrlandoUrsi2023")

  }

}
