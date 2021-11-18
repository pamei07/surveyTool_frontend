import {Component, OnInit} from '@angular/core';
import {SurveyService} from "../../../services/survey/survey.service";
import {Survey} from "../../../model/survey";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../../../model/user";

@Component({
  selector: 'survey-final-overview',
  templateUrl: 'survey-final-overview.component.html'
})

export class SurveyFinalOverviewComponent implements OnInit {

  survey!: Survey;
  user!: User;
  surveyNotFound: boolean = false;
  accessId!: string | null;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private surveyService: SurveyService) {
  }

  ngOnInit() {
    this.accessId = this.activatedRoute!.snapshot.paramMap.get('accessId');

    this.surveyService.getSurveyOverview(this.accessId).subscribe(
      (response: Survey) => {
        this.survey = response;
        console.log(this.survey);
      }, (error: HttpErrorResponse) => {
        this.surveyNotFound = true;
        console.log(error);
      }
    )
  }
}
