import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cobro-form-field-validation-messages',
  templateUrl: './form-field-validation-messages.component.html',
  styleUrls: ['./form-field-validation-messages.component.scss']
})
export class FormFieldValidationMessagesComponent implements OnInit {

  @Input()
  cobranzaFormControl: FormControl;

  constructor() { }

  ngOnInit() {
  }

}
