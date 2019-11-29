import { Routes } from '@angular/router';
import { DashboardListComponent } from './dashboard-list/dashboard-list.component';

export const DashboardRoutes: Routes = [
    { path: '', component: DashboardListComponent, data: { breadcrumbs: true, text: 'Informacion Cobranza' } }
];
