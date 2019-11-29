import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonaListComponent } from './persona-list/persona-list.component';
import { PersonaCreateComponent } from './persona-create/persona-create.component';
import { PersonaEditComponent } from './persona-edit/persona-edit.component';
import { PersonaViewComponent } from './persona-view/persona-view.component';
import { PersonaRoutes } from './persona.routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(PersonaRoutes),
    SharedModule,
    CoreModule
  ],
  declarations: [PersonaListComponent, PersonaCreateComponent, PersonaEditComponent, PersonaViewComponent],
  exports: [PersonaListComponent, PersonaCreateComponent, PersonaEditComponent, PersonaViewComponent]
})
export class PersonaModule { }
