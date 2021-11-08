import {Component, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";
import {ActivatedRoute} from "@angular/router";
import {SurveyService} from "../../../services/survey/survey.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'answer-survey-parent',
  templateUrl: 'answer-survey-parent.component.html'
})

export class AnswerSurveyParentComponent implements OnInit {

  survey!: Survey;
  surveyNotFound: boolean = false;
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
        this.surveyNotFound = true;
      }
    )
  }

  ngOnInit() {
  }

  setParticipate(bool: boolean) {
    this.participate = bool;
  }
}
