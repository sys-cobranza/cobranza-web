import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { DashboardRoutes } from './dashboard.routes';
import { DashboardListComponent } from './dashboard-list/dashboard-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(DashboardRoutes),
    SharedModule,
    CoreModule
  ],
  declarations: [DashboardListComponent, DashboardListComponent],
  exports: [DashboardListComponent]
})
export class DashboardModule { }
