import {Component, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";
import {ActivatedRoute, Router} from "@angular/router";
import {SurveyService} from "../../../services/survey/survey.service";

@Component({
  selector: 'answer-survey-overview',
  templateUrl: 'answer-survey-overview.component.html'
})

export class AnswerSurveyOverviewComponent implements OnInit {

  survey!: Survey;
  uuid: string | null;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private surveyService: SurveyService) {

    this.uuid = activatedRoute.snapshot.queryParamMap.get('surveyUUID');

    surveyService.getSurveyOverviewByUuid(this.uuid).subscribe(x => {
      this.survey = <Survey>x;
      console.log(this.survey);
      sessionStorage.setItem('survey' + this.uuid, JSON.stringify(this.survey));
    })
  }

  ngOnInit() {
  }

  participate() {
    this.router.navigate(['/answers/participate'], {queryParams: {surveyUUID: this.uuid}});
  }
}
