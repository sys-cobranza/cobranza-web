import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'cobro-form-fields-status',
  templateUrl: './form-fields-status.component.html',
  styleUrls: ['./form-fields-status.component.scss']
})
export class FormFieldsStatusComponent implements OnInit {

  @Input()
  cobranzaForm: FormGroup;

  hasRequiredFields: boolean;

  constructor() { }

  ngOnInit() {
    this.refreshState();
  }

  refreshState() {
    this.hasRequiredFields = this.checkIfHasRequiredFields(this.cobranzaForm);
  }

  checkIfHasRequiredFields(formGroup: FormGroup): boolean {
    let result = false;
    for (const key in this.cobranzaForm.controls) {
      if (!this.cobranzaForm.controls[key]) { continue; }

      const abstractControl: AbstractControl = this.cobranzaForm.controls[key];
      if (abstractControl instanceof FormGroup) {
        if (this.checkIfHasRequiredFields(abstractControl)) {
          result = true;
          break;
        }
      } else {
        const validator: any = abstractControl.validator && abstractControl.validator(new FormControl());
        if (validator && validator.required) {
          result = true;
          break;
        }
      }
    }
    return result;
  }

}
