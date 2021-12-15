import {Component} from '@angular/core';
import {Survey} from "../../../model/survey";
import {FormBuilder, Validators} from "@angular/forms";
import {stringNotEmpty} from "../../../directives/string-validation.directive";
import {dateInFuture, startDateBeforeEndDateValidator} from "../../../directives/date-validation.directive";

@Component({
  selector: 'app-survey-creation',
  templateUrl: 'survey-creation.component.html'
})

export class SurveyCreationComponent {

  survey!: Survey;

  surveyForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(255), stringNotEmpty()]],
    description: ['', [Validators.maxLength(3000)]],
    startDate: ['', [Validators.required, dateInFuture()]],
    endDate: ['', [Validators.required, dateInFuture()]],
    userName: ['', [Validators.maxLength(255)]],
    openAccess: false
  }, {validators: startDateBeforeEndDateValidator()})

  constructor(private fb: FormBuilder) {
    this.survey = new Survey();
  }
}
