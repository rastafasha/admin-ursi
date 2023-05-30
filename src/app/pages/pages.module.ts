import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//componentes
import { DashboardComponent } from './dashboard/dashboard.component';

//modulos

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//helpers
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';

import {PagesComponent} from './pages.component';
import { ConfModule } from './conf/conf.module';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';

// paginacion
import { NgxPaginationModule } from 'ngx-pagination';
// Import Angular plugin.
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
//paypal
import { NgxPayPalModule } from 'ngx-paypal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from "ngx-spinner";

import { ContactComponent } from './contact/contact.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { PaymentDetailsComponent } from './payments/payment-details/payment-details.component';
import { PaymentEditComponent } from './payments/payment-edit/payment-edit.component';
import { PaymentsComponent } from './payments/payments.component';
import { ProfileComponent } from './profile/profile.component';
import { UserHistorialpagosComponent } from './user-historialpagos/user-historialpagos.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersComponent } from './users/users.component';
import { PostIndexComponent } from './posts/post-index/post-index.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { GalleriesComponent } from './galleries/galleries.component';
import { CursosIndexComponent } from './cursos/cursos-index/cursos-index.component';
import { CursosEditComponent } from './cursos/cursos-edit/cursos-edit.component';
import { ServiciosIndexComponent } from './servicios/servicios-index/servicios-index.component';
import { ServiciosEditComponent } from './servicios/servicios-edit/servicios-edit.component';

// angular file uploader
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { AnilloIndexComponent } from './galleries/anillo/anillo-index/anillo-index.component';
import { AnilloEditComponent } from './galleries/anillo/anillo-edit/anillo-edit.component';
import { AreteIndexComponent } from './galleries/arete/arete-index/arete-index.component';
import { AreteEditComponent } from './galleries/arete/arete-edit/arete-edit.component';
import { ExpocafIndexComponent } from './galleries/expocaf/expocaf-index/expocaf-index.component';
import { ExpocafEditComponent } from './galleries/expocaf/expocaf-edit/expocaf-edit.component';
import { JoyaIndexComponent } from './galleries/joya/joya-index/joya-index.component';
import { JoyaEditComponent } from './galleries/joya/joya-edit/joya-edit.component';
import { PublicacionIndexComponent } from './galleries/publicacion/publicacion-index/publicacion-index.component';
import { PublicacionEditComponent } from './galleries/publicacion/publicacion-edit/publicacion-edit.component';
import { PulseraIndexComponent } from './galleries/pulsera/pulsera-index/pulsera-index.component';
import { PulseraEditComponent } from './galleries/pulsera/pulsera-edit/pulsera-edit.component';
import { OrlandoIndexComponent } from './eventos/orlando/orlando-index/orlando-index.component';
import { DijeIndexComponent } from './galleries/dije/dije-index/dije-index.component';
import { DijeEditComponent } from './galleries/dije/dije-edit/dije-edit.component';
import { EscuelaIndexComponent } from './galleries/escuela/escuela-index/escuela-index.component';
import { EscuelaEditComponent } from './galleries/escuela/escuela-edit/escuela-edit.component';
import { HerramientaIndexComponent } from './servicios/herramienta/herramienta-index/herramienta-index.component';
import { HerramientaEditComponent } from './servicios/herramienta/herramienta-edit/herramienta-edit.component';
import { CronogramaIndexComponent } from './cursos/cronograma/cronograma-index/cronograma-index.component';
import { CronogramaEditComponent } from './cursos/cronograma/cronograma-edit/cronograma-edit.component';
import { BannerEditComponent } from './banner/banner-edit/banner-edit.component';
import { BannerIndexComponent } from './banner/banner-index/banner-index.component';
import { SubcripcionesComponent } from './subcripciones/subcripciones.component';
@NgModule({
  declarations: [
    DashboardComponent,
    DashboardAdminComponent,
    PagesComponent,
    ProfileComponent,
    UsersComponent,
    UserHistorialpagosComponent,
    ContactComponent,
    DashboardUserComponent,
    PagesComponent,
    PaymentDetailsComponent,
    PaymentsComponent,
    PaymentEditComponent,
    UserProfileComponent,
    PostIndexComponent,
    PostEditComponent,
    GalleriesComponent,
    CursosIndexComponent,
    CursosEditComponent,
    ServiciosIndexComponent,
    ServiciosEditComponent,
    AnilloIndexComponent,
    AnilloEditComponent,
    AreteIndexComponent,
    AreteEditComponent,
    ExpocafIndexComponent,
    ExpocafEditComponent,
    JoyaIndexComponent,
    JoyaEditComponent,
    PublicacionIndexComponent,
    PublicacionEditComponent,
    PulseraIndexComponent,
    PulseraEditComponent,
    OrlandoIndexComponent,
    DijeIndexComponent,
    DijeEditComponent,
    EscuelaIndexComponent,
    EscuelaEditComponent,
    HerramientaIndexComponent,
    HerramientaEditComponent,
    CronogramaIndexComponent,
    CronogramaEditComponent,
    BannerIndexComponent,
    BannerEditComponent,
    SubcripcionesComponent
  ],
  exports: [
    DashboardComponent,
    DashboardAdminComponent,
    ProfileComponent,
    UsersComponent,
    UserHistorialpagosComponent,
    ContactComponent,
    DashboardUserComponent,
    PagesComponent,
    PaymentDetailsComponent,
    PaymentsComponent,
    PaymentEditComponent,
    UserProfileComponent,
    PostIndexComponent,
    PostEditComponent,
    GalleriesComponent,
    CursosIndexComponent,
    CursosEditComponent,
    ServiciosIndexComponent,
    ServiciosEditComponent,
    AnilloIndexComponent,
    AnilloEditComponent,
    AreteIndexComponent,
    AreteEditComponent,
    ExpocafIndexComponent,
    ExpocafEditComponent,
    JoyaIndexComponent,
    JoyaEditComponent,
    PublicacionIndexComponent,
    PublicacionEditComponent,
    PulseraIndexComponent,
    PulseraEditComponent,
    OrlandoIndexComponent,
    DijeIndexComponent,
    DijeEditComponent,
    EscuelaIndexComponent,
    EscuelaEditComponent,
    HerramientaIndexComponent,
    HerramientaEditComponent,
    CronogramaIndexComponent,
    CronogramaEditComponent,
    BannerIndexComponent,
    BannerEditComponent,
    SubcripcionesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    PipesModule,
    ConfModule,
    ComponentsModule,
    NgxPayPalModule,
    NgbModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    CKEditorModule,
    AngularFileUploaderModule,

  ],
  providers: [
  ],
})
export class PagesModule { }
