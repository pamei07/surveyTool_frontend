import {Component, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";
import {ActivatedRoute} from "@angular/router";
import {SurveyService} from "../../../services/survey/survey.service";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../model/user";

@Component({
  selector: 'answer-survey-parent',
  templateUrl: 'answer-survey.component.html'
})

export class AnswerSurveyComponent implements OnInit {

  survey!: Survey;
  user!: User;
  surveyNotFound: boolean = false;
  withinTimeFrame: boolean = true;
  uuid: string | null;
  participate: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private surveyService: SurveyService,
              private userService: UserService) {

    this.uuid = activatedRoute.snapshot.queryParamMap.get('surveyUUID');

    surveyService.getSurveyOverviewByUuid(this.uuid).subscribe(
      (response: Survey) => {
        this.survey = response;
        if (this.survey.userID !== null) {
          this.userService.getUserById(this.survey.userID).subscribe(user => {
            this.user = user;
          });
        }
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
