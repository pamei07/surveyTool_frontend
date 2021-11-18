import {Component, OnInit} from '@angular/core';
import {SurveyService} from "../../../services/survey/survey.service";
import {Survey} from "../../../model/survey";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'survey-overview',
  templateUrl: 'survey-overview.component.html'
})

export class SurveyOverviewComponent implements OnInit {

  survey!: Survey;
  surveyNotFound: boolean = false;
  accessId!: string | null;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private surveyService: SurveyService) {
  }

  ngOnInit() {
    this.accessId = this.activatedRoute!.snapshot.paramMap.get('accessId');

    this.surveyService.getSurveyByAccessId(this.accessId).subscribe(
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
