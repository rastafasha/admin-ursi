import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Import Angular plugin.
import { QRCodeModule } from 'angular2-qrcode';
import { NgxPayPalModule } from 'ngx-paypal';
import { NgxPaginationModule } from 'ngx-pagination';

import { HttpClientModule } from '@angular/common/http';
//Qr
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PagosRecientesComponent } from './pagos-recientes/pagos-recientes.component';
import { UsuariosRecientesComponent } from './usuarios-recientes/usuarios-recientes.component';
import { ReciboFacturaComponent } from './recibo-factura/recibo-factura.component';
import {PipesModule} from '../pipes/pipes.module';
import {ModalComponent} from './modal/modal.component';
import { ChartComponent } from './chart/chart.component';


@NgModule({
  declarations: [
    PagosRecientesComponent,
    UsuariosRecientesComponent,
    ReciboFacturaComponent,
    ModalComponent,
    ChartComponent,
  ],
  exports: [
    PagosRecientesComponent,
    UsuariosRecientesComponent,
    ReciboFacturaComponent,
    ModalComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    PipesModule,
    NgxPayPalModule,
    NgxPaginationModule
    // CKEditorModule
  ]
})
export class ComponentsModule { }
