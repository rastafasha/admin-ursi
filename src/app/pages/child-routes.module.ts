import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReciboFacturaComponent } from '../components/recibo-factura/recibo-factura.component';
import { ConfiguracionesComponent } from './conf/configuraciones/configuraciones.component';
import { RolesViewComponent } from './conf/roles/roles-view/roles-view.component';
import { ContactComponent } from './contact/contact.component';

//pages
import { DashboardComponent } from './dashboard/dashboard.component';

import { PaymentDetailsComponent } from './payments/payment-details/payment-details.component';
import { PaymentEditComponent } from './payments/payment-edit/payment-edit.component';
import { PaymentsComponent } from './payments/payments.component';
import { UserHistorialpagosComponent } from './user-historialpagos/user-historialpagos.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { CategoryEditComponent } from './conf/category/category-edit/category-edit.component';
import { CategoryIndexComponent } from './conf/category/category-index/category-index.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { PostIndexComponent } from './posts/post-index/post-index.component';
import { GalleriesComponent } from './galleries/galleries.component';
import { CursosIndexComponent } from './cursos/cursos-index/cursos-index.component';
import { CursosEditComponent } from './cursos/cursos-edit/cursos-edit.component';
import { ServiciosEditComponent } from './servicios/servicios-edit/servicios-edit.component';
import { ServiciosIndexComponent } from './servicios/servicios-index/servicios-index.component';
import { AnilloIndexComponent } from './galleries/anillo/anillo-index/anillo-index.component';
import { AnilloEditComponent } from './galleries/anillo/anillo-edit/anillo-edit.component';
import { AreteEditComponent } from './galleries/arete/arete-edit/arete-edit.component';
import { AreteIndexComponent } from './galleries/arete/arete-index/arete-index.component';
import { ExpocafEditComponent } from './galleries/expocaf/expocaf-edit/expocaf-edit.component';
import { ExpocafIndexComponent } from './galleries/expocaf/expocaf-index/expocaf-index.component';
import { JoyaEditComponent } from './galleries/joya/joya-edit/joya-edit.component';
import { JoyaIndexComponent } from './galleries/joya/joya-index/joya-index.component';
import { PublicacionEditComponent } from './galleries/publicacion/publicacion-edit/publicacion-edit.component';
import { PublicacionIndexComponent } from './galleries/publicacion/publicacion-index/publicacion-index.component';
import { PulseraEditComponent } from './galleries/pulsera/pulsera-edit/pulsera-edit.component';
import { PulseraIndexComponent } from './galleries/pulsera/pulsera-index/pulsera-index.component';
import { DijeEditComponent } from './galleries/dije/dije-edit/dije-edit.component';
import { DijeIndexComponent } from './galleries/dije/dije-index/dije-index.component';
import { EscuelaEditComponent } from './galleries/escuela/escuela-edit/escuela-edit.component';
import { EscuelaIndexComponent } from './galleries/escuela/escuela-index/escuela-index.component';
import { OrlandoIndexComponent } from './eventos/orlando/orlando-index/orlando-index.component';
import { HerramientaEditComponent } from './servicios/herramienta/herramienta-edit/herramienta-edit.component';
import { HerramientaIndexComponent } from './servicios/herramienta/herramienta-index/herramienta-index.component';
import { CronogramaEditComponent } from './cursos/cronograma/cronograma-edit/cronograma-edit.component';
import { CronogramaIndexComponent } from './cursos/cronograma/cronograma-index/cronograma-index.component';
import { BannerEditComponent } from './banner/banner-edit/banner-edit.component';
import { BannerIndexComponent } from './banner/banner-index/banner-index.component';
import { SubcripcionesComponent } from './subcripciones/subcripciones.component';




const childRoutes: Routes = [

    { path: '',  component: DashboardComponent, data:{title:'Dashboard'} },
    //auth

    //configuraciones
    { path: 'configuraciones',  component: ConfiguracionesComponent, data:{title:'Configuraciones'} },

    { path: 'rolesconf', component: RolesViewComponent, data:{title:'Planes'} },

    { path: 'categories', component: CategoryIndexComponent, data:{title:'Categoria'} },
    { path: 'category/:id', component: CategoryIndexComponent, data:{title:'Categoria'} },
    { path: 'categoria/crear', component: CategoryEditComponent, data:{title:'Crear Categoria'} },
    { path: 'category/edit/:id', component: CategoryEditComponent, data:{title:'Editar Categoria'} },

    //galleries
    { path: 'galleries',  component: GalleriesComponent, data:{title:'galleries'} },
    { path: 'anillos',  component: AnilloIndexComponent, data:{title:'galleries'} },
    { path: 'anillo/create', component: AnilloEditComponent, data:{title:'Crear Curso'} },
    { path: 'anillo/edit/:id', component: AnilloEditComponent, data:{title:'Editar Curso'} },
    { path: 'aretes',  component: AreteIndexComponent, data:{title:'galleries'} },
    { path: 'arete/create', component: AreteEditComponent, data:{title:'Crear Curso'} },
    { path: 'arete/edit/:id', component: AreteEditComponent, data:{title:'Editar Curso'} },
    { path: 'expocaf',  component: ExpocafIndexComponent, data:{title:'galleries'} },
    { path: 'expocaf/create', component: ExpocafEditComponent, data:{title:'Crear Curso'} },
    { path: 'expocaf/edit/:id', component: ExpocafEditComponent, data:{title:'Editar Curso'} },
    { path: 'joyas',  component: JoyaIndexComponent, data:{title:'galleries'} },
    { path: 'joya/create', component: JoyaEditComponent, data:{title:'Crear Curso'} },
    { path: 'joya/edit/:id', component: JoyaEditComponent, data:{title:'Editar Curso'} },
    { path: 'publicaciones',  component: PublicacionIndexComponent, data:{title:'galleries'} },
    { path: 'publicacion/create', component: PublicacionEditComponent, data:{title:'Crear Curso'} },
    { path: 'publicacion/edit/:id', component: PublicacionEditComponent, data:{title:'Editar Curso'} },
    { path: 'pulseras',  component: PulseraIndexComponent, data:{title:'galleries'} },
    { path: 'pulsera/create', component: PulseraEditComponent, data:{title:'Crear Curso'} },
    { path: 'pulsera/edit/:id', component: PulseraEditComponent, data:{title:'Editar Curso'} },
    { path: 'dijes',  component: DijeIndexComponent, data:{title:'galleries'} },
    { path: 'dije/create', component: DijeEditComponent, data:{title:'Crear Curso'} },
    { path: 'dije/edit/:id', component: DijeEditComponent, data:{title:'Editar Curso'} },
    { path: 'escuela',  component: EscuelaIndexComponent, data:{title:'galleries'} },
    { path: 'escuela/create', component: EscuelaEditComponent, data:{title:'Crear Curso'} },
    { path: 'escuela/edit/:id', component: EscuelaEditComponent, data:{title:'Editar Curso'} },

    //evento
    { path: 'evento-orlando', component: OrlandoIndexComponent, data:{title:'Cursos'} },
    { path: 'subscripciones', component: SubcripcionesComponent, data:{title:'Cursos'} },
    //cursos
    { path: 'cursos', component: CursosIndexComponent, data:{title:'Cursos'} },
    { path: 'curso/create', component: CursosEditComponent, data:{title:'Crear Curso'} },
    { path: 'curso/edit/:id', component: CursosEditComponent, data:{title:'Editar Curso'} },
    //cronograma
    { path: 'cronogramas', component: CronogramaIndexComponent, data:{title:'Cursos'} },
    { path: 'cronograma/create', component: CronogramaEditComponent, data:{title:'Crear Curso'} },
    { path: 'cronograma/edit/:id', component: CronogramaEditComponent, data:{title:'Editar Curso'} },
    //banner
    { path: 'banners', component: BannerIndexComponent, data:{title:'Cursos'} },
    { path: 'banner/create', component: BannerEditComponent, data:{title:'Crear Curso'} },
    { path: 'banner/edit/:id', component: BannerEditComponent, data:{title:'Editar Curso'} },

    // posts
    { path: 'posts', component: PostIndexComponent, data:{title:'Metodo de Pago'} },
    { path: 'post/create', component: PostEditComponent, data:{title:'Crear Metodo de Pago'} },
    { path: 'post/edit/:id', component: PostEditComponent, data:{title:'Editar Metodo de Pago'} },
    // servicios
    { path: 'servicios', component: ServiciosIndexComponent, data:{title:'servicios'} },
    { path: 'servicio/create', component: ServiciosEditComponent, data:{title:'Crear servicios'} },
    { path: 'servicio/edit/:id', component: ServiciosEditComponent, data:{title:'Editar servicios'} },

    //herramientas
    { path: 'herramientas', component: HerramientaIndexComponent, data:{title:'servicios'} },
    { path: 'herramienta/create', component: HerramientaEditComponent, data:{title:'Crear servicios'} },
    { path: 'herramienta/edit/:id', component: HerramientaEditComponent, data:{title:'Editar servicios'} },


    //admin
    { path: 'payments',   component: PaymentsComponent, data:{title:'Pagos'} },
    { path: 'payment-detail/:id', component: PaymentDetailsComponent, data:{title:'Detalle Pago'} },
    { path: 'payment/edit/:id', component: PaymentEditComponent, data:{title:'Editar Pago'} },
    { path: 'factura/:id', component: ReciboFacturaComponent, data:{title:'Buscar'} },

    //user
    { path: 'users', component: UsersComponent, data:{title:'Usuarios'} },
    { path: 'user/:id', component: UserProfileComponent, data:{title:'Detalle Usuario'} },
    { path: 'user/edit/:id', component: UserProfileComponent, data:{title:'Editar Usuario'} },
    // { path: 'user/edit/:id', component: UserDetailsComponent, data:{title:'Editar Usuario'} },
    { path: 'historial-pagos', component: UserHistorialpagosComponent, data:{title:'Historial Pagos'} },
    { path: 'profile/:id',  component: ProfileComponent, data:{title:'Perfil'} },

    { path: 'search/:searchItem', component: UsersComponent, data:{title:'Buscar'} },
    { path: 'contact', component: ContactComponent, data:{title:'Contacto'} },


    { path: '', redirectTo: 'admin', pathMatch: 'full' },
    { path: '**', component:  DashboardComponent },





]

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoute),
    RouterModule.forChild(childRoutes),
  ],
    exports: [ RouterModule ]
})
export class ChildRoutesModule { }
