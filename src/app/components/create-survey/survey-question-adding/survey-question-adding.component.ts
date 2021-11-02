import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Survey} from "../../../model/survey";

@Component({
  selector: 'survey-question-adding',
  templateUrl: 'survey-question-adding.component.html'
})

export class SurveyQuestionAddingComponent implements OnInit {

  @Input() survey!: Survey;
  @Output() basicInfoBoolean = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
  }

  sendBasicInfoFalse() {
    this.basicInfoBoolean.emit(false);
  }
}
