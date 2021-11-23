import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Survey} from "../../../model/survey";
import {dateInFuture, startDateBeforeEndDateValidator} from "../../../directives/date-validation.directive";

@Component({
  selector: 'app-survey-basic-information-form',
  templateUrl: 'survey-basic-information-form.component.html'
})

export class SurveyBasicInformationFormComponent implements OnInit {

  @Input() survey!: Survey;
  @Output() basicInfoBoolean = new EventEmitter<boolean>();

  surveyForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.maxLength(3000)]],
    startDate: ['', [Validators.required, dateInFuture()]],
    endDate: ['', [Validators.required, dateInFuture()]]
  }, {validators: startDateBeforeEndDateValidator()})

  get name() {
    return this.surveyForm.get('name');
  }

  get description() {
    return this.surveyForm.get('description');
  }

  get startDate() {
    return this.surveyForm.get('startDate');
  }

  get endDate() {
    return this.surveyForm.get('endDate');
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.surveyForm.setValue({
      name: this.survey.name,
      description: this.survey.description,
      startDate: this.survey.startDate,
      endDate: this.survey.endDate
    });
  }

  setBasicInformationOnSurvey() {
    this.survey.name = this.surveyForm.value.name;
    this.survey.description = this.surveyForm.value.description;
    this.survey.startDate = this.surveyForm.value.startDate;
    this.survey.endDate = this.surveyForm.value.endDate;
    this.basicInfoBoolean.emit(true);
  }
}
