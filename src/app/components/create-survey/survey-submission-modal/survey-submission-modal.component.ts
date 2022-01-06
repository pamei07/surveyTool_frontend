import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'app-survey-submission-modal',
  templateUrl: 'survey-submission-modal.component.html'
})

export class SurveySubmissionModalComponent implements OnInit {

  @Input() loggedIn!: boolean;
  @Output() postSurvey = new EventEmitter;
  surveyForm!: FormGroup;

  get creatorName() {
    return this.surveyForm.get('creatorName');
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
