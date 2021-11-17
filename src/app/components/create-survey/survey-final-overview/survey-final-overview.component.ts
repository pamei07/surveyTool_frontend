import {Component, OnInit} from '@angular/core';
import {SurveyService} from "../../../services/survey/survey.service";
import {Survey} from "../../../model/survey";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../../../model/user";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'survey-final-overview',
  templateUrl: 'survey-final-overview.component.html'
})

export class SurveyFinalOverviewComponent implements OnInit {

  survey!: Survey;
  user!: User;
  surveyNotFound: boolean = false;
  id!: string | null;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private surveyService: SurveyService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.id = this.activatedRoute!.snapshot.paramMap.get('id');

    this.surveyService.getSurveyOverview(this.id).subscribe(
      (response: Survey) => {
        this.survey = response;
        if (this.survey.userID !== null) {
          this.userService.getUserById(this.survey.userID).subscribe(user => {
            this.user = user;
          });
        }
        console.log(this.survey);
      }, (error: HttpErrorResponse) => {
        this.surveyNotFound = true;
        console.log(error);
      }
    )
  }
}
