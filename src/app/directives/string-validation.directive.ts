import {Directive} from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function stringNotEmpty(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let inputString = control.value;
    if (inputString !== null && !inputString.trim()) {
      return {stringIsEmpty: true}
    } else {
      return null;
    }
  }
}

@Directive({selector: '[appStringValidation]'})
export class StringValidationDirective {
  constructor() {
  }
}
