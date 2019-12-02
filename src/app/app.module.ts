import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { DataService } from './core/data/data.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BsDropdownModule, BsDatepickerModule, ModalModule } from 'ngx-bootstrap';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';

defineLocale('es', esLocale);

export function getDatepickerConfig(): BsDatepickerConfig {
  return Object.assign(new BsDatepickerConfig(), {
    locale: 'es',
    containerClass: 'theme-default',
    dateInputFormat: 'DD/MM/YYYY',
    selectDay: true,
    showWeekNumbers: false
  });
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    SharedModule,
    CoreModule
  ],
  providers: [
    DataService,
    { provide: BsDatepickerConfig, useFactory: getDatepickerConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
