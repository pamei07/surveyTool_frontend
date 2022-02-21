import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'app-survey-basic-information-form',
  templateUrl: 'survey-basic-information-form.component.html'
})

export class SurveyBasicInformationFormComponent implements OnInit {

  @Output() basicInfoBoolean = new EventEmitter<boolean>();
  surveyForm!: FormGroup;

  get name() {
    return this.surveyForm.get('name');
  }

  get description() {
    return this.surveyForm.get('description');
  }

  constructor(private parentFormGroup: FormGroupDirective) {
  }

  ngOnInit() {
    this.surveyForm = this.parentFormGroup.control;
  }
}
