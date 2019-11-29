import { Directive, OnInit, Input, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[cobranzaFormRequiredLabel]'
})
export class FormRequiredLabelDirective implements OnInit {

  @Input()
  cobranzaFormRequiredLabel: FormControl;

  @HostBinding('class.required-pf')
  isRequired: boolean;

  constructor() { }

  ngOnInit() {
    const validator: any = this.cobranzaFormRequiredLabel.validator && this.cobranzaFormRequiredLabel.validator(new FormControl());
    this.isRequired = validator && validator.required;
  }

}
