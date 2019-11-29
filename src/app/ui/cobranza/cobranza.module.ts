import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CobranzaListComponent } from './cobranza-list/cobranza-list.component';
import { CobranzaCreateComponent } from './cobranza-create/cobranza-create.component';
import { CobranzaViewComponent } from './cobranza-view/cobranza-view.component';
import { CobranzaEditComponent } from './cobranza-edit/cobranza-edit.component';
import { CobranzaRoutes } from './cobranza.routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(CobranzaRoutes),
    SharedModule,
    CoreModule
  ],
  declarations: [CobranzaListComponent, CobranzaCreateComponent, CobranzaViewComponent, CobranzaEditComponent],
  exports: [CobranzaListComponent, CobranzaCreateComponent, CobranzaViewComponent, CobranzaEditComponent]
})
export class CobranzaModule { }
