import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Survey} from "../../../model/survey";

@Component({
  selector: 'answer-survey-overview',
  templateUrl: 'answer-survey-overview.component.html'
})

export class AnswerSurveyOverviewComponent implements OnInit {

  @Input() survey!: Survey;
  @Output() participateBoolean = new EventEmitter<boolean>();

  constructor() {

  }

  ngOnInit() {
  }

  participate() {
    this.participateBoolean.emit(true);
  }
}
