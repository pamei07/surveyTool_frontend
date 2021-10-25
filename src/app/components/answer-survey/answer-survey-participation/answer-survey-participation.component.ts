import {Component, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'answer-survey-participation',
  templateUrl: 'answer-survey-participation.component.html'
})

export class AnswerSurveyParticipationComponent implements OnInit {

  survey!: Survey;
  uuid: string | null;

  constructor(private activatedRoute: ActivatedRoute) {
    this.uuid = activatedRoute.snapshot.queryParamMap.get('surveyUUID');
    this.survey = JSON.parse(<string>sessionStorage.getItem('survey' + this.uuid));
  }

  ngOnInit() {
  }
}
