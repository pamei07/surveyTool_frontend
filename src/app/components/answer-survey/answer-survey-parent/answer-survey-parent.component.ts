import {Component, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";
import {ActivatedRoute} from "@angular/router";
import {SurveyService} from "../../../services/survey/survey.service";

@Component({
  selector: 'answer-survey-parent',
  templateUrl: 'answer-survey-parent.component.html'
})

export class AnswerSurveyParentComponent implements OnInit {

  survey!: Survey;
  uuid: string | null;
  participate: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private surveyService: SurveyService) {

    this.uuid = activatedRoute.snapshot.queryParamMap.get('surveyUUID');

    surveyService.getSurveyOverviewByUuid(this.uuid).subscribe(survey => {
      this.survey = survey;
      console.log(this.survey);
    })
  }

  ngOnInit() {
  }

  setParticipate(bool: boolean) {
    this.participate = bool;
  }
}
