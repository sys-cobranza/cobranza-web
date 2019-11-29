import { Component, Input, OnInit } from '@angular/core';

import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cobro-button-login',
  templateUrl: './button-login.component.html',
  styleUrls: ['./button-login.component.scss']
})
export class ButtonLoginComponent implements OnInit {

  @Input()
  cobranzaForm: FormGroup;

  @Input()
  working = false;

  constructor() { }

  ngOnInit() {
  }

  onClickChild(event) {
    if (!this.cobranzaForm.valid) {
      event.preventDefault();
    }
  }

}
