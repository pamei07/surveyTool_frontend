import {Directive} from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {Survey} from "../model/survey";

export function matchesSurveyName(survey: Survey): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value !== survey?.name.trim()) {
      return {doesNotMatchSurveyName: true};
    } else {
      return null;
    }
  }
}


@Directive({selector: '[appMatchSurveyNameValidation]'})
export class MatchSurveyNameValidationDirective {
  constructor() {
  }
}
