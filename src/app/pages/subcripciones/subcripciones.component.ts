import { HttpClient, HttpBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Orlando } from 'src/app/models/orlando';
import { User } from 'src/app/models/user';
import { OrlandoService } from 'src/app/services/orlando.service';
import { Subcripcion } from 'src/app/models/subcripcion';
import { SubcripcionService } from 'src/app/services/subcripcion.service';

// import { FileSaverService } from 'ngx-filesaver';
// import * as XLSX from 'xlsx';

@Component({
  selector: 'app-subcripciones',
  templateUrl: './subcripciones.component.html',
  styleUrls: ['./subcripciones.component.css']
})
export class SubcripcionesComponent implements OnInit {

  title = "Subscripciones"
  subcripcions: Subcripcion;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;

  constructor(
    private location: Location,
    private http: HttpClient,
    private subcripcionService: SubcripcionService,
    handler: HttpBackend,
    // private fileSaver: FileSaverService
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
    this.subcripcionService.getSubcripcions().subscribe(
      res =>{
        this.subcripcions = res;
        error => this.error = error
        // console.log(this.orlandos);
      }
    );
  }



  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }




  // excelExport(){
  //   const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
  //   const EXCLE_EXTENSION = '.xlsx';

  //   this.getData();


  //   //custom code
  //   const worksheet = XLSX.utils.json_to_sheet(this.datos);

  //   const workbook = {
  //     Sheets:{
  //       'testingSheet': worksheet
  //     },
  //     SheetNames:['testingSheet']
  //   }

  //   const excelBuffer = XLSX.write(workbook, {bookType:'xlsx', type: 'array'});

  //   const blobData = new Blob([excelBuffer],{type: EXCEL_TYPE});

  //   this.fileSaver.save(blobData, "subcripcions")

  // }
  // csvExport(){
  //   const CSV_TYPE = 'text/csv';
  //   const CSV_EXTENSION = '.csv';

  //   this.getData();


  //   //custom code
  //   const worksheet = XLSX.utils.json_to_sheet(this.datos);

  //   const workbook = {
  //     Sheets:{
  //       'testingSheet': worksheet
  //     },
  //     SheetNames:['testingSheet']
  //   }

  //   const excelBuffer = XLSX.write(workbook, {bookType:'csv', type: 'array'});

  //   const blobData = new Blob([excelBuffer],{type: CSV_TYPE});

  //   this.fileSaver.save(blobData, "subcripcions")

  // }

}
