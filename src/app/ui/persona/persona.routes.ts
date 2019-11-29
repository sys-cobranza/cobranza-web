import { Routes } from "@angular/router";
import { PersonaListComponent } from "./persona-list/persona-list.component";
import { PersonaCreateComponent } from "./persona-create/persona-create.component";
import { PersonaViewComponent } from "./persona-view/persona-view.component";
import { PersonaEditComponent } from "./persona-edit/persona-edit.component";

export const PersonaRoutes: Routes = [
    {
        path: "",
        component: PersonaListComponent,
        data: { breadcrumbs: true, text: "Persona" }
    },
    {
        path: "create",
        component: PersonaCreateComponent,
        data: { breadcrumbs: true, text: "Nuevo Registro" }
    },
    {
        path: "view/:key",
        component: PersonaViewComponent,
        data: { breadcrumbs: true, text: "Vesualizacion Registro" }
    },
    {
        path: "edit/:key",
        component: PersonaEditComponent,
        data: { breadcrumbs: true, text: "Editar Registro" }
    }
];
