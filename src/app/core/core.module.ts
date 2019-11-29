import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  EmptyStateModule,
  NavigationModule,
  TableModule,
  CardModule,
  NotificationService,
  NotificationModule
} from "patternfly-ng";

import { McBreadcrumbsModule } from "ngx-breadcrumbs";
import { BsDropdownModule } from "ngx-bootstrap";

import { PreviewService } from "./data/preview.service";
import { AuthGuard } from "./guard/auth.guard";
import { NotifyService } from "./data/notify.service";
import { Configuration } from "./config/config";
import { CobranzaService } from "./data/cobranza.service";
import { DataService } from "./data/data.service";
import { PersonaService } from "./data/persona.service";
import { ProductoService } from "./data/producto.service";
import { UsuarioService } from "./data/usuario.service";
import { ApiRestService } from "./data/api-rest.service";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  imports: [
    CommonModule,
    McBreadcrumbsModule.forRoot(),
    NavigationModule,
    NotificationModule,
    EmptyStateModule,
    TableModule,
    CardModule,
    BsDropdownModule.forRoot(),
    NgbModule
  ],
  declarations: [],
  providers: [
    ApiRestService,
    PreviewService,
    NotificationService,
    NotifyService,
    Configuration,
    CobranzaService,
    PersonaService,
    ProductoService,
    UsuarioService,
    AuthGuard
  ],
  exports: [
    McBreadcrumbsModule,
    NavigationModule,
    NotificationModule,
    EmptyStateModule,
    TableModule,
    BsDropdownModule,
    CardModule,
    NgbModule
  ]
})
export class CoreModule { }
