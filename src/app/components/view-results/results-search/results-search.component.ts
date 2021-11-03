import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Survey} from "../../../model/survey";
import {SurveyService} from "../../../services/survey/survey.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'results-search',
  templateUrl: 'results-search.component.html'
})

export class ResultsSearchComponent implements OnInit {
  @Output() surveyEventEmitter = new EventEmitter<Survey>();

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
    this.surveyService.getSurveyByAccessId(this.accessId).subscribe(survey => {
      this.surveyEventEmitter.emit(<Survey>survey);
    });

  }
}
