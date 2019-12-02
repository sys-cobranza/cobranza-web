import { VentaCreateComponent } from './venta-create/venta-create.component';
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
        path: "vender",
        component: VentaCreateComponent,
        data: { breadcrumbs: true, text: "Nueva Venta" }
    },
    {
        path: "cobrar",
        component: CobranzaCreateComponent,
        data: { breadcrumbs: true, text: "Cobrar Deuda" }
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
