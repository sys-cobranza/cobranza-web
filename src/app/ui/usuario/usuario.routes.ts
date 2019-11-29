import { Routes } from "@angular/router";
import { UsuarioListComponent } from "./usuario-list/usuario-list.component";
import { UsuarioCreateComponent } from "./usuario-create/usuario-create.component";
import { UsuarioViewComponent } from "./usuario-view/usuario-view.component";
import { UsuarioEditComponent } from "./usuario-edit/usuario-edit.component";

export const UsuarioRoutes: Routes = [
    {
        path: "",
        component: UsuarioListComponent,
        data: { breadcrumbs: true, text: "Usuario" }
    },
    {
        path: "create",
        component: UsuarioCreateComponent,
        data: { breadcrumbs: true, text: "Nuevo Registro" }
    },
    {
        path: "view/:key",
        component: UsuarioViewComponent,
        data: { breadcrumbs: true, text: "Vesualizacion Registro" }
    },
    {
        path: "edit/:key",
        component: UsuarioEditComponent,
        data: { breadcrumbs: true, text: "Editar Registro" }
    }
];
