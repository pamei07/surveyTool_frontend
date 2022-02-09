import {Component} from '@angular/core';
import {Survey} from "../../../model/survey";
import {FormBuilder, Validators} from "@angular/forms";
import {stringNotEmpty} from "../../../directives/string-validation.directive";
import {dateInFuture, startDateBeforeEndDateValidator} from "../../../directives/date-validation.directive";
import {ActivatedRoute} from "@angular/router";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-survey-creation',
  templateUrl: 'survey-creation.component.html'
})

export class SurveyCreationComponent {

  survey!: Survey;
  loggedIn: boolean = true;

  surveyForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(255), stringNotEmpty()]],
    description: ['', [Validators.maxLength(3000)]],
    startDate: ['', [Validators.required, dateInFuture()]],
    endDate: ['', [Validators.required, dateInFuture()]],
    creatorName: ['', [Validators.maxLength(255)]],
    openAccess: false,
    anonymousParticipation: false
  }, {validators: startDateBeforeEndDateValidator()})

  constructor(private activatedRoute: ActivatedRoute,
              private keycloakService: KeycloakService,
              private fb: FormBuilder) {
    this.survey = new Survey();
    this.keycloakService.isLoggedIn().then(isLoggedIn => {
      this.loggedIn = isLoggedIn;
      console.log(this.loggedIn)
    })
  }
}
