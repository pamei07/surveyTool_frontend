import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Survey} from "../../../model/survey";
import {SurveyService} from "../../../services/survey/survey.service";
import {FormBuilder} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'results-search',
  templateUrl: 'results-search.component.html'
})

export class ResultsSearchComponent implements OnInit {

  @Output() surveyEventEmitter = new EventEmitter<Survey>();
  surveyNotFound: boolean = false;
  currentAccessId: string = '';

  resultsForm = this.fb.group({accessId: this.fb.control('')});

  get accessId() {
    return this.resultsForm.get('accessId')!.value;
  }

  constructor(private fb: FormBuilder,
              private surveyService: SurveyService) {
  }

  ngOnInit() {
  }

  emitSurvey() {
    this.currentAccessId = this.accessId;
    this.surveyNotFound = false;
    this.surveyService.getSurveyByAccessId(this.accessId).subscribe(
      (response: Survey) => {
        this.surveyEventEmitter.emit(response);
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.surveyNotFound = true;
      }
    );
  }
}
