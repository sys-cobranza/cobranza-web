import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cobro-button-cancel',
  templateUrl: './button-cancel.component.html',
  styleUrls: ['./button-cancel.component.scss']
})
export class ButtonCancelComponent implements OnInit {

  @Output()
  cobranzaOnCancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor() { }

  ngOnInit() {
  }
  
  cancel() {
    this.cobranzaOnCancel.emit(true);
  }

}
