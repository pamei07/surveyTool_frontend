import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Survey} from "../../../model/survey";

@Component({
  selector: 'add-survey-content',
  templateUrl: 'add-survey-content.component.html'
})

export class AddSurveyContentComponent {

  @Input() survey!: Survey;
  @Output() basicInfoBoolean = new EventEmitter<boolean>();

  constructor() {
  }

  sendBasicInfoFalse() {
    this.basicInfoBoolean.emit(false);
  }
}
