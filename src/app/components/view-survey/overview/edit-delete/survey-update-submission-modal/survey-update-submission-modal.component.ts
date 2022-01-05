import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'app-survey-update-submission-modal',
  templateUrl: './survey-update-submission-modal.component.html'
})
export class SurveyUpdateSubmissionModalComponent implements OnInit {

  @Output() updateSurveyEmitter = new EventEmitter;
  surveyUpdateForm!: FormGroup;

  get startDate() {
    return this.surveyUpdateForm.get('startDate');
  }

  get endDate() {
    return this.surveyUpdateForm.get('endDate');
  }

  constructor(private parentFormGroup: FormGroupDirective) {
  }

  ngOnInit() {
    this.surveyUpdateForm = this.parentFormGroup.control;
  }

  submitSurveyUpdate() {
    this.updateSurveyEmitter.emit();
  }
}
