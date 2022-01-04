import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {matchesSurveyName} from "../../../../../directives/match-survey-name-validation.directive";
import {Survey} from "../../../../../model/survey";

@Component({
  selector: 'app-survey-delete',
  templateUrl: './survey-delete.component.html'
})
export class SurveyDeleteComponent implements OnChanges {

  @Input() survey!: Survey;

  confirmDeletionForm!: FormGroup;

  get surveyName() {
    return this.confirmDeletionForm.get('surveyName');
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.confirmDeletionForm = this.fb.group({
        surveyName: ['', [Validators.required, matchesSurveyName(this.survey)]]
      }
    )
  }

  deleteSurvey() {
    console.log('deleted')
  }
}
