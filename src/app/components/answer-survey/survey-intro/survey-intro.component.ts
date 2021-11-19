import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Survey} from "../../../model/survey";

@Component({
  selector: 'survey-intro',
  templateUrl: 'survey-intro.component.html'
})

export class SurveyIntroComponent {

  @Input() survey!: Survey;
  @Input() surveyNotFound!: boolean;
  @Input() withinTimeFrame!: boolean;
  @Output() participateBoolean = new EventEmitter<boolean>();

  constructor() {

  }

  participate() {
    this.participateBoolean.emit(true);
  }
}
