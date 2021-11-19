import {Component, OnInit} from '@angular/core';
import {SurveyService} from "../../../services/survey/survey.service";
import {Survey} from "../../../model/survey";

@Component({
  selector: 'app-survey-list',
  templateUrl: 'survey-list.component.html'
})

export class SurveyListComponent implements OnInit {

  openAccessSurveys!: Survey[];

  constructor(private surveyService: SurveyService) {
  }

  ngOnInit() {
    this.surveyService.getSurveysThatAreOpenAccess().subscribe((surveys) => {
      this.openAccessSurveys = surveys;
    })
  }
}
