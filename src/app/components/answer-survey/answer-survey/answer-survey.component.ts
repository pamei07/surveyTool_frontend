import {Component} from '@angular/core';
import {Survey} from "../../../model/survey";
import {ActivatedRoute} from "@angular/router";
import {SurveyService} from "../../../services/survey/survey.service";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../../../model/user";

@Component({
  selector: 'app-answer-survey-parent',
  templateUrl: 'answer-survey.component.html'
})

export class AnswerSurveyComponent {

  survey!: Survey;
  user!: User;
  surveyNotFound: boolean = false;
  withinTimeFrame: boolean = true;
  participationId: string | null;
  participate: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private surveyService: SurveyService) {

    this.participationId = activatedRoute.snapshot.paramMap.get('participationId');

    surveyService.getSurveyOverviewByParticipationId(this.participationId).subscribe(
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

  setParticipate(bool: boolean) {
    this.participate = bool;
  }
}
