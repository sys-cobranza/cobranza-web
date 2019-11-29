import { CobranzaViewComponent } from './cobranza-view/cobranza-view.component';
import { Routes } from "@angular/router";
import { CobranzaListComponent } from "./cobranza-list/cobranza-list.component";
import { CobranzaCreateComponent } from "./cobranza-create/cobranza-create.component";
import { CobranzaEditComponent } from './cobranza-edit/cobranza-edit.component';


export const CobranzaRoutes: Routes = [
    {
        path: "",
        component: CobranzaListComponent,
        data: { breadcrumbs: true, text: "Cobranza" }
    },
    {
        path: "create",
        component: CobranzaCreateComponent,
        data: { breadcrumbs: true, text: "Nuevo Registro" }
    },
    {
        path: "view/:key",
        component: CobranzaViewComponent,
        data: { breadcrumbs: true, text: "Vesualizacion Registro" }
    },
    {
        path: "edit/:key",
        component: CobranzaEditComponent,
        data: { breadcrumbs: true, text: "Editar Registro" }
    }
];
