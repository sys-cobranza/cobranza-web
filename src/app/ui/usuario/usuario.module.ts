import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';
import { UsuarioEditComponent } from './usuario-edit/usuario-edit.component';
import { UsuarioViewComponent } from './usuario-view/usuario-view.component';
import { UsuarioRoutes } from './usuario.routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(UsuarioRoutes),
    SharedModule,
    CoreModule
  ],
  declarations: [UsuarioListComponent, UsuarioCreateComponent, UsuarioEditComponent, UsuarioViewComponent ],
  exports: [UsuarioListComponent, UsuarioCreateComponent, UsuarioEditComponent, UsuarioViewComponent]
})
export class UsuarioModule { }
