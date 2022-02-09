import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SurveyService} from "../../../../../services/survey/survey.service";
import {dateInFuture} from "../../../../../directives/date-validation.directive";
import {Survey} from "../../../../../model/survey";
import {User} from "../../../../../model/user";
import {KeycloakService} from "keycloak-angular";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../../services/user/user.service";
import {SurveyEndDateOnly} from "../../../../../model/survey-end-date-only";

@Component({
  selector: 'app-edit-enddate',
  templateUrl: './edit-end-date.component.html'
})
export class EditEndDateComponent implements OnInit {

  survey!: Survey;
  accessId!: string | null;
  authorized!: boolean;
  updateEndDateForm!: FormGroup;
  errorMessages: string[] = [];
  private backendErrorMessage: string = "Beim Speichern der Umfrage ist etwas schiefgelaufen.\n" +
    " Bitte überpüfen Sie Ihre Angaben und versuchen Sie es erneut.";

  get endDate() {
    return this.updateEndDateForm.get('endDate');
  }

  constructor(private fb: FormBuilder,
              private keycloakService: KeycloakService,
              private surveyService: SurveyService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
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
                    this.updateEndDateForm = this.fb.group({
                      endDate: [this.survey.endDate, [Validators.required, dateInFuture()]],
                    })
                    this.authorized = true;
                  }
                })
            })
        })
      }
    })
  }

  patchEndDate() {
    this.keycloakService.isLoggedIn().then(isLoggedIn => {
      if (isLoggedIn) {
        this.keycloakService.loadUserProfile().then(userProfile => {
          this.userService.findUserByEMail(userProfile.email).subscribe(
            (userResponse: User) => {
              this.surveyService.findSurveyByAccessId(this.accessId).subscribe(
                (surveyResponse: Survey) => {
                  this.survey = surveyResponse;
                  if (userResponse.id === this.survey.userId) {
                    this.survey.endDate = this.endDate?.value;
                    let surveyEndDateOnly = new SurveyEndDateOnly();
                    surveyEndDateOnly.id = this.survey.id;
                    surveyEndDateOnly.endDate = this.survey.endDate;
                    this.surveyService.patchEndDate(surveyEndDateOnly).subscribe(
                      (response: Survey) => {
                        let updatedSurvey = response;
                        let accessId = <string>updatedSurvey.accessId;
                        console.log(updatedSurvey);

                        this.router.navigate(["surveys", accessId]);
                      }, () => {
                        this.errorMessages = [];
                        this.errorMessages.push(this.backendErrorMessage);
                      });
                  }
                })
            })
        })
      }
    })
  }
}
