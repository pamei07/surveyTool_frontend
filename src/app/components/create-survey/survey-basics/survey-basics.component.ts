import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Survey} from "../../../model/survey";

@Component({
  selector: 'survey-basics',
  templateUrl: 'survey-basics.component.html'
})

export class SurveyBasicsComponent implements OnInit {

  @Input() survey!: Survey;
  @Output() basicInfoBoolean = new EventEmitter<boolean>();

  surveyForm = this.fb.group({
    name: [''],
    description: [''],
    startDate: [''],
    endDate: ['']
  })

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
