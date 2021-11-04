import {Directive} from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function maxSelectGreaterThanMinSelectValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    let minSelectControl = group.get('checkboxGroup')?.get('minSelect');
    let maxSelectControl = group.get('checkboxGroup')?.get('maxSelect');

    let minSelect = minSelectControl?.value;
    let maxSelect = maxSelectControl?.value;

    if (minSelectControl?.disabled || maxSelectControl?.disabled) {
      return null;
    } else if (maxSelect < minSelect) {
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
