import {Directive} from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function startDateBeforeEndDateValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    // DF => date format
    let startDateDF = Date.parse(group.get('startDate')?.value);
    let endDateDF = Date.parse(group.get('endDate')?.value);

    if (endDateDF < startDateDF) {
      return {endDateBeforeStartDate: true};
    } else {
      return null;
    }
  }
}

export function endDateInFuture(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // DF => date format
    let endDateDF = Date.parse(control.value);
    let currentDate = new Date();
    let currentDateAsString = currentDate.toString();
    let currentDateDF = Date.parse(currentDateAsString);

    if (endDateDF < currentDateDF) {
      return {endDateInPast: true};
    } else {
      return null;
    }
  }
}

@Directive({selector: '[date-validation]'})
export class DateValidationDirective {
  constructor() {
  }
}
