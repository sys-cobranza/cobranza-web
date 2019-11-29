import { Component, Input, OnInit } from '@angular/core';

import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cobro-button-save',
  templateUrl: './button-save.component.html',
  styleUrls: ['./button-save.component.scss']
})
export class ButtonSaveComponent implements OnInit {

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
