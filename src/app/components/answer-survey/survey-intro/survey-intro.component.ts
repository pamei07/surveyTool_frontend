import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Survey} from "../../../model/survey";

@Component({
  selector: 'survey-intro',
  templateUrl: 'survey-intro.component.html'
})

export class SurveyIntroComponent implements OnInit {

  @Input() survey!: Survey;
  @Input() surveyNotFound!: boolean;
  @Input() withinTimeFrame!: boolean;
  @Output() participateBoolean = new EventEmitter<boolean>();

  constructor() {

  }

  ngOnInit() {
  }

  participate() {
    this.participateBoolean.emit(true);
  }
}
