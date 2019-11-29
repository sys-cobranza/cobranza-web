import { Routes } from "@angular/router";
import { ProductoListComponent } from "./producto-list/producto-list.component";
import { ProductoCreateComponent } from "./producto-create/producto-create.component";
import { ProductoViewComponent } from "./producto-view/producto-view.component";
import { ProductoEditComponent } from "./producto-edit/producto-edit.component";


export const ProductoRoutes: Routes = [
    {
        path: "",
        component: ProductoListComponent,
        data: { breadcrumbs: true, text: "Producto" }
    },
    {
        path: "create",
        component: ProductoCreateComponent,
        data: { breadcrumbs: true, text: "Nuevo Registro" }
    },
    {
        path: "view/:key",
        component: ProductoViewComponent,
        data: { breadcrumbs: true, text: "Vesualizacion Registro" }
    },
    {
        path: "edit/:key",
        component: ProductoEditComponent,
        data: { breadcrumbs: true, text: "Editar Registro" }
    }
];
