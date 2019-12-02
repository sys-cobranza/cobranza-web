import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule, BsDatepickerModule, ModalModule } from 'ngx-bootstrap';
import { FormFieldsStatusComponent } from './components/form-fields-status/form-fields-status.component';
import { FormFieldValidationStateDirective } from './directives/form-field-validation-state.directive';
import { FormRequiredLabelDirective } from './directives/form-required-label.directive';
import { ButtonAddComponent } from './components/button-add/button-add.component';
import { ButtonCancelComponent } from './components/button-cancel/button-cancel.component';
import { ButtonSaveComponent } from './components/button-save/button-save.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ButtonDeleteComponent } from './components/button-delete/button-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldValidationMessagesComponent } from './components/form-field-validation-messages/form-field-validation-messages.component';
import { TruncatePipe } from './pipe/truncate.pipe';
import { FileSizePipe } from './pipe/file-size.pipe';
import { ButtonLoginComponent } from './components/button-login/button-login.component';
import { NotifyMessageComponent } from './components/notify-message/notify-message.component';
import { SafeUrlPipe } from './pipe/safe-url.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    BsDropdownModule,
    BsDatepickerModule,
    ModalModule
  ],
  declarations: [
    FormFieldValidationStateDirective,
    FormRequiredLabelDirective,

    FormFieldsStatusComponent,
    FormFieldValidationMessagesComponent,

    ButtonAddComponent,
    ButtonCancelComponent,
    ButtonSaveComponent,
    ButtonDeleteComponent,
    ButtonLoginComponent,
    LoadingComponent,
    NotifyMessageComponent,

    TruncatePipe,
    FileSizePipe,
    SafeUrlPipe

  ],
  exports: [
    BsDropdownModule,
    BsDatepickerModule,
    ModalModule,

    FormFieldValidationStateDirective,
    FormRequiredLabelDirective,

    FormFieldsStatusComponent,
    FormFieldValidationMessagesComponent,

    ButtonAddComponent,
    ButtonCancelComponent,
    ButtonSaveComponent,
    ButtonDeleteComponent,
    ButtonLoginComponent,
    LoadingComponent,
    NotifyMessageComponent,

    TruncatePipe,
    FileSizePipe,
    SafeUrlPipe
  ]
})
export class SharedModule { }
