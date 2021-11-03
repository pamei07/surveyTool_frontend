import {Directive} from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function maxSelectGreaterThanMinSelectValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    let minSelect = group.get('checkboxGroup')?.get('minSelect')?.value;
    let maxSelect = group.get('checkboxGroup')?.get('maxSelect')?.value;

    if (maxSelect < minSelect) {
      return {maxSelectLessThanMinSelect: true};
    } else {
      return null;
    }
  }
}

@Directive({selector: '[min-max-select-validation]'})
export class MinMaxSelectValidationDirective {
  constructor() {
  }
}
