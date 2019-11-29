import { Routes } from '@angular/router';
import { UiComponent } from './ui.component';
import { AuthGuard } from '../core/guard/auth.guard';

export const UIRoutes: Routes = [
    {
        path: '',
        component: UiComponent,
        //canActivate: [AuthGuard],
        data: { breadcrumbs: true, text: 'Inicio' },
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: '../ui/dashboard/dashboard.module#DashboardModule', data: { breadcrumbs: true, text: 'Inicio' } },
            { path: 'producto', loadChildren: '../ui/producto/producto.module#ProductoModule', data: { breadcrumbs: true, text: 'Producto' } },
            { path: 'persona', loadChildren: '../ui/persona/persona.module#PersonaModule', data: { breadcrumbs: true, text: 'Persona' } },
            { path: 'cobranza', loadChildren: '../ui/cobranza/cobranza.module#CobranzaModule', data: { breadcrumbs: true, text: 'Cobranza' } },
            { path: 'usuario', loadChildren: '../ui/usuario/usuario.module#UsuarioModule', data: { breadcrumbs: true, text: 'Usuario' } }
        ]
    },
    // {
    //     path: 'login',
    //     component: UserLoginComponent
    // },
];
