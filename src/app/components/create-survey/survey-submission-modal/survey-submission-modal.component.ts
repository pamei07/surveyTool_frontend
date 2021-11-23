import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'app-survey-submission-modal',
  templateUrl: 'survey-submission-modal.component.html'
})

export class SurveySubmissionModalComponent implements OnInit {

  @Output() postSurvey = new EventEmitter;
  parentForm!: FormGroup;

  get userName() {
    return this.parentForm.get('userName');
  }

  constructor(private parentFormGroup: FormGroupDirective) {
  }

  ngOnInit() {
    this.parentForm = this.parentFormGroup.control;
  }

  post() {
    this.postSurvey.emit();
  }
}
