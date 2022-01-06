import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Survey} from "../../../../../model/survey";
import {KeycloakService} from "keycloak-angular";
import {SurveyService} from "../../../../../services/survey/survey.service";
import {UserService} from "../../../../../services/user/user.service";
import {FormBuilder, Validators} from "@angular/forms";
import {stringNotEmpty} from "../../../../../directives/string-validation.directive";
import {dateInFuture, startDateBeforeEndDateValidator} from "../../../../../directives/date-validation.directive";
import {User} from "../../../../../model/user";

@Component({
  selector: 'app-survey-update',
  templateUrl: './survey-update.component.html'
})
export class SurveyUpdateComponent implements OnInit {

  survey!: Survey;
  accessId!: string | null;
  authorized!: boolean;

  surveyUpdateForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(255), stringNotEmpty()]],
    description: ['', [Validators.maxLength(3000)]],
    startDate: ['', [Validators.required, dateInFuture()]],
    endDate: ['', [Validators.required, dateInFuture()]],
    creatorName: ['', [Validators.maxLength(255)]],
    openAccess: false,
    anonymousParticipation: false
  }, {validators: startDateBeforeEndDateValidator()})

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private keycloakService: KeycloakService,
              private surveyService: SurveyService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.accessId = this.activatedRoute!.snapshot.paramMap.get('accessId');
    this.keycloakService.isLoggedIn().then(isLoggedIn => {
      if (isLoggedIn) {
        this.keycloakService.loadUserProfile().then(userProfile => {
          this.userService.findUserByEMail(userProfile.email).subscribe(
            (userResponse: User) => {
              this.surveyService.findSurveyByAccessId(this.accessId).subscribe(
                (surveyResponse: Survey) => {
                  this.survey = surveyResponse;
                  if (userResponse.id === this.survey.userId) {
                    this.authorized = true;
                    this.surveyUpdateForm.patchValue({
                      name: this.survey.name,
                      description: this.survey.description,
                      startDate: this.survey.startDate,
                      endDate: this.survey.endDate,
                      creatorName: this.survey.creatorName,
                      openAccess: this.survey.openAccess,
                      anonymousParticipation: this.survey.anonymousParticipation
                    });
                  }
                })
            })
        })
      }
    })
  }
}
