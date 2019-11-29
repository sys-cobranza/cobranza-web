import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cobro-button-add',
  templateUrl: './button-add.component.html',
  styleUrls: ['./button-add.component.scss']
})
export class ButtonAddComponent implements OnInit {

  @Input()
  cobranzaForm: FormGroup;

  @Input()
  working = false;

  @Output()
  cobranzaOnSave: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  save() {
    if (!this.cobranzaForm.valid) {
      this.cobranzaOnSave.emit(true);
    } else {
      this.cobranzaOnSave.emit(false);
    }
  }

}
