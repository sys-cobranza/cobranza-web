import { Directive, OnInit, Input, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[cobranzaFormFieldValidationState]'
})
export class FormFieldValidationStateDirective implements OnInit {

  @Input()
  cobranzaFormFieldValidationState: FormControl;

  @HostBinding('class.has-error')
  hasError: boolean;

  constructor() { }

  ngOnInit() {
    this.cobranzaFormFieldValidationState.statusChanges.subscribe(controlValue => {
      if (this.cobranzaFormFieldValidationState.valid || this.cobranzaFormFieldValidationState.disabled) {
        this.hasError = false;
      } else {
        this.hasError = true;
      }
    });
  }

}
