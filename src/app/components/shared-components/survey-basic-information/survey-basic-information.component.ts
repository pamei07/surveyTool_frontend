import {Component, Input} from '@angular/core';
import {Survey} from "../../../model/survey";

@Component({
  selector: 'survey-basic-information',
  templateUrl: 'survey-basic-information.component.html'
})

export class SurveyBasicInformationComponent {

  @Input() survey!: Survey;

  constructor() {
  }
}
