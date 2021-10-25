import {Component, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";
import {ActivatedRoute} from "@angular/router";
import {SurveyService} from "../../../services/survey.service";

@Component({
  selector: 'answer-survey-overview',
  templateUrl: 'answer-survey-overview.component.html'
})

export class AnswerSurveyOverviewComponent implements OnInit {

  survey!: Survey;
  private uuid: string | null;

  constructor(private activatedRoute: ActivatedRoute,
              private surveyService: SurveyService) {

    this.uuid = activatedRoute.snapshot.queryParamMap.get('surveyUUID');

    surveyService.getSurveyOverviewByUuid(this.uuid).subscribe(x => {
      this.survey = <Survey>x;
      console.log(this.survey);
    })

    sessionStorage.setItem('survey' + this.uuid, JSON.stringify(this.survey));
  }

  ngOnInit() {
  }
}
