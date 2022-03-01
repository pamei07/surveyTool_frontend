import {Directive} from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {Question} from "../model/question";

export function rankingConfirmedDoneIfRequired(question: Question): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    let rankingDone = formGroup.get('confirmed')?.value;

    if (question.required === true && rankingDone === false) {
      return {requiredButNotDone: true};
    } else {
      return null;
    }
  }
}

@Directive({selector: '[appRankingValidation]'})
export class RankingValidationDirective {
}
