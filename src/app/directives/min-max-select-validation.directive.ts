import {Directive} from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {Question} from "../model/question";

export function maxSelectGreaterThanMinSelectValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    let minSelectControl = formGroup.get('checkboxGroup')?.get('minSelect');
    let maxSelectControl = formGroup.get('checkboxGroup')?.get('maxSelect');

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

export function atLeastOneCheckboxIfQuestionRequired(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    let requiredControl = formGroup.get('required');
    let required = requiredControl?.value;
    let minSelectControl = formGroup.get('checkboxGroup')?.get('minSelect');
    let minSelect = minSelectControl?.value;

    if (required === true && minSelectControl?.status !== 'DISABLED' && minSelect == 0) {
      return {requiredButMinZeroCheckboxes: true};
    } else {
      return null;
    }
  }
}

export function noOfCheckboxesCheckedInMinMaxRange(question: Question): ValidatorFn {
  return (checkboxArray: AbstractControl): ValidationErrors | null => {
    let questionRequired = question.required;
    let minSelect = question!.checkboxGroup!.minSelect;
    let maxSelect = question!.checkboxGroup!.maxSelect;

    let checkedCounter = 0;
    question!.checkboxGroup?.checkboxes.forEach((checkbox, checkboxIndex) => {
      if (checkboxArray.get(checkboxIndex.toString())?.get('checked')?.value === true) {
        checkedCounter++;
      }
    })

    // If the question is not required: User can decide to not answer the question
    if (!questionRequired && checkedCounter == 0) {
      return null;
    }
    // If the user checks at least one box, he/she has to be in range, regardless if the question is required or not
    else if (minSelect! <= checkedCounter && checkedCounter <= maxSelect!) {
      return null;
    } else {
      return {noOfCheckedBoxesNotInRange: true};
    }
  }
}

@Directive({selector: '[appMinMaxSelectValidation]'})
export class MinMaxSelectValidationDirective {
  constructor() {
  }
}
