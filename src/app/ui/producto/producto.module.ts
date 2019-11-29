import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoListComponent } from './producto-list/producto-list.component';
import { ProductoCreateComponent } from './producto-create/producto-create.component';
import { ProductoEditComponent } from './producto-edit/producto-edit.component';
import { ProductoViewComponent } from './producto-view/producto-view.component';
import { ProductoRoutes } from './producto.routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ProductoRoutes),
    SharedModule,
    CoreModule
  ],
  declarations: [ProductoListComponent, ProductoCreateComponent, ProductoEditComponent, ProductoViewComponent],
  exports: [ProductoListComponent, ProductoCreateComponent, ProductoEditComponent, ProductoViewComponent]
})
export class ProductoModule { }
