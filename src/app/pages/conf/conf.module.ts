import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionesComponent } from './configuraciones/configuraciones.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RolesViewComponent } from './roles/roles-view/roles-view.component';

// Import Angular plugin.
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// paginacion
import { NgxPaginationModule } from 'ngx-pagination';

import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { CategoryIndexComponent } from './category/category-index/category-index.component';

@NgModule({
  declarations: [
    ConfiguracionesComponent,
    RolesViewComponent,
    CategoryEditComponent,
    CategoryIndexComponent,

  ],
  exports: [
    ConfiguracionesComponent,
    RolesViewComponent,
    CategoryEditComponent,
    CategoryIndexComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    PipesModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    CKEditorModule,
    // AngularFileUploaderModule
  ]
})
export class ConfModule { }
