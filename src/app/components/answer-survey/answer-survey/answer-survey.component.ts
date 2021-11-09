import {Component, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";
import {ActivatedRoute} from "@angular/router";
import {SurveyService} from "../../../services/survey/survey.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'answer-survey-parent',
  templateUrl: 'answer-survey.component.html'
})

export class AnswerSurveyComponent implements OnInit {

  survey!: Survey;
  surveyNotFound: boolean = false;
  withinTimeFrame: boolean = true;
  uuid: string | null;
  participate: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private surveyService: SurveyService) {

    this.uuid = activatedRoute.snapshot.queryParamMap.get('surveyUUID');

    surveyService.getSurveyOverviewByUuid(this.uuid).subscribe(
      (response: Survey) => {
        this.survey = response;
        console.log(this.survey);
      }, (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status === 404) {
          this.surveyNotFound = true;
        } else if (error.status === 403) {
          this.survey = error.error;
          this.withinTimeFrame = false;
        }
      }
    )
  }

  ngOnInit() {
  }

  setParticipate(bool: boolean) {
    this.participate = bool;
  }
}
