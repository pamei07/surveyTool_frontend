import {Component} from '@angular/core';
import {Survey} from "../../../model/survey";

@Component({
  selector: 'survey-creation',
  templateUrl: 'survey-creation.component.html'
})

export class SurveyCreationComponent {

  survey!: Survey;
  basicInfoGiven = false;

  constructor() {
    this.survey = new Survey();
  }

  setBasicInfoGiven(bool: boolean) {
    this.basicInfoGiven = bool;
  }
}
