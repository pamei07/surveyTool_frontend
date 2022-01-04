import {Component, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";
import {ActivatedRoute, Router} from "@angular/router";
import {SurveyService} from "../../../services/survey/survey.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-survey',
  templateUrl: 'survey.component.html'
})

export class SurveyComponent implements OnInit {

  survey!: Survey;
  surveyNotFound: boolean = false;
  accessId!: string | null;
  overview: boolean = true;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private surveyService: SurveyService) {
  }

  ngOnInit() {
    this.accessId = this.activatedRoute!.snapshot.paramMap.get('accessId');

    this.surveyService.findSurveyByAccessId(this.accessId).subscribe(
      (response: Survey) => {
        this.survey = response;
        console.log(this.survey);
      }, (error: HttpErrorResponse) => {
        this.surveyNotFound = true;
        console.log(error);
      }
    )
  }

  setOverview(bool: boolean) {
    this.overview = bool;
  }
}
