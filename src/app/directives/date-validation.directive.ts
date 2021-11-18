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

export function dateInFuture(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // DF => date format
    let dateDF = Date.parse(control.value);
    // Get current date and time and parse it for comparing
    let currentDate = new Date();
    let currentDateAsString = currentDate.toString();
    let currentDateDF = Date.parse(currentDateAsString);

    if (dateDF < currentDateDF) {
      return {dateInPast: true};
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
