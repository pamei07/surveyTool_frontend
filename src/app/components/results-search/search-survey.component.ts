import {Component} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {SurveyService} from "../../services/survey/survey.service";
import {Survey} from "../../model/survey";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-search-survey',
  templateUrl: 'search-survey.component.html'
})

export class SearchSurveyComponent {

  surveyNotFound: boolean = false;
  currentAccessId: string = '';

  searchForm = this.fb.group({accessId: this.fb.control('')});

  get accessId() {
    return this.searchForm.get('accessId')!.value;
  }

  constructor(private fb: FormBuilder,
              private router: Router,
              private surveyService: SurveyService) {
  }

  getSurveyByAccessId() {
    this.currentAccessId = this.accessId;
    this.surveyNotFound = false;
    this.surveyService.getSurveyByAccessId(this.accessId).subscribe(
      (response: Survey) => {
        this.router.navigate(["surveys", response.accessID]);
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.surveyNotFound = true;
      }
    );
  }
}
