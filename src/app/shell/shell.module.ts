import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { ShellHeaderComponent } from './shell-header/shell-header.component';
import { ShellContentComponent } from './shell-content/shell-content.component';
import { ShellFooterComponent } from './shell-footer/shell-footer.component';
import { ShellSidebarComponent } from './shell-sidebar/shell-sidebar.component';
import { ShellNotificationComponent } from './shell-notification/shell-notification.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CoreModule
  ],
  declarations: [ShellHeaderComponent, ShellContentComponent, ShellFooterComponent, ShellSidebarComponent, ShellNotificationComponent],
  exports: [ShellHeaderComponent, ShellContentComponent, ShellFooterComponent, ShellSidebarComponent]
})
export class ShellModule { }
