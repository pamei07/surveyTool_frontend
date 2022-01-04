import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {matchesSurveyName} from "../../../../../directives/match-survey-name-validation.directive";
import {Survey} from "../../../../../model/survey";
import {SurveyService} from "../../../../../services/survey/survey.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-survey-delete',
  templateUrl: './survey-delete.component.html'
})
export class SurveyDeleteComponent implements OnChanges {

  @Input() survey!: Survey;

  confirmDeletionForm!: FormGroup;

  get surveyName() {
    return this.confirmDeletionForm.get('surveyName');
  }

  constructor(private fb: FormBuilder,
              private surveyService: SurveyService,
              private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.confirmDeletionForm = this.fb.group({
        surveyName: ['', [Validators.required, matchesSurveyName(this.survey)]]
      }
    )
  }

  deleteSurvey() {
    this.surveyService.deleteSurvey(this.survey).subscribe(
      () => {
        this.router.navigate(['/profile/surveys']);
      }
    );
  }
}
