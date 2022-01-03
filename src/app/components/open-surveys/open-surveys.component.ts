import {Component, OnInit} from '@angular/core';
import {SurveyService} from "../../services/survey/survey.service";
import {Survey} from "../../model/survey";

@Component({
  selector: 'app-open-survey-paginator',
  templateUrl: 'open-surveys.component.html'
})

export class OpenSurveysComponent implements OnInit {

  openAccessSurveys!: Survey[];

  constructor(private surveyService: SurveyService) {
  }

  ngOnInit() {
    this.surveyService.findSurveysThatAreOpenAccess().subscribe((surveys) => {
      this.openAccessSurveys = surveys;
    })
  }
}
