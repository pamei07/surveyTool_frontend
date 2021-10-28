import {Component, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";

@Component({
  selector: 'results-overview',
  templateUrl: 'results-overview.component.html'
})

export class ResultsOverviewComponent implements OnInit {
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
