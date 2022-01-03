import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'app-survey-submission-modal',
  templateUrl: 'survey-submission-modal.component.html'
})

export class SurveySubmissionModalComponent implements OnInit {

  // TODO: Allow logged in users to enter custom name as survey creator
  @Input() loggedIn!: boolean;
  @Output() postSurvey = new EventEmitter;
  surveyForm!: FormGroup;

  get userName() {
    return this.surveyForm.get('userName');
  }

  get startDate() {
    return this.surveyForm.get('startDate');
  }

  get endDate() {
    return this.surveyForm.get('endDate');
  }

  constructor(private parentFormGroup: FormGroupDirective) {
  }

  ngOnInit() {
    this.surveyForm = this.parentFormGroup.control;
  }

  saveSurvey() {
    this.postSurvey.emit();
  }
}
