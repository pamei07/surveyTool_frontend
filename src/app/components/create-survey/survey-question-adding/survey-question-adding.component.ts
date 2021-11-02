import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'survey-question-adding',
  templateUrl: 'survey-question-adding.component.html'
})

export class SurveyQuestionAddingComponent implements OnInit {

  parentForm!: FormGroup;
  @Output() basicInfoBoolean = new EventEmitter<boolean>();

  constructor(private parentFormGroup: FormGroupDirective) {
  }

  ngOnInit() {
    this.parentForm = this.parentFormGroup.control;
    console.log(this.parentForm)
  }

  sendBasicInfoFalse() {
    this.basicInfoBoolean.emit(false);
  }
}
