import {Component, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";

@Component({
  selector: 'results-header',
  templateUrl: 'results-header.component.html'
})

export class ResultsHeaderComponent implements OnInit {
  survey!: Survey;

  constructor() {
  }

  ngOnInit() {
  }

  showSurvey(survey: Survey) {
    this.survey = survey;
    console.log(this.survey);
  }
}
