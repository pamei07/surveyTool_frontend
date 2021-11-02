import {Component, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";

@Component({
  selector: 'survey-creation',
  templateUrl: 'survey-creation.component.html'
})

export class SurveyCreationComponent implements OnInit {

  survey!: Survey;
  basicInfoGiven = false;

  constructor() {
    this.survey = new Survey();
  }

  ngOnInit() {
  }

  setBasicInfoGiven(bool: boolean) {
    this.basicInfoGiven = bool;
  }
}
