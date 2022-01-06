import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";
import {SurveyService} from "../../../services/survey/survey.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, FormGroupDirective} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../model/user";
import {KeycloakService} from "keycloak-angular";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-survey-submission',
  templateUrl: 'survey-submission.component.html'
})

export class SurveySubmissionComponent implements OnInit {

  @Input() survey!: Survey;
  surveyForm!: FormGroup;
  errorMessages: string[] = [];
  private backendErrorMessage: string = "Beim Speichern der Umfrage ist etwas schiefgelaufen.\n" +
    " Bitte überpüfen Sie Ihre Angaben und versuchen Sie es erneut.";
  loggedIn: boolean = false;

  get name() {
    return this.surveyForm.get('name');
  }

  get description() {
    return this.surveyForm.get('description');
  }

  get startDate() {
    return this.surveyForm.get('startDate');
  }

  get endDate() {
    return this.surveyForm.get('endDate');
  }

  get creatorName() {
    return this.surveyForm.get('creatorName');
  }

  get openAccess() {
    return this.surveyForm.get('openAccess');
  }

  get anonymousParticipation() {
    return this.surveyForm.get('anonymousParticipation');
  }

  constructor(private surveyService: SurveyService,
              private userService: UserService,
              private fb: FormBuilder,
              private router: Router,
              private parentFormGroup: FormGroupDirective,
              private keycloak: KeycloakService) {
    this.keycloak.isLoggedIn().then(isLoggedIn => {
      this.loggedIn = isLoggedIn;
    });
  }

  ngOnInit() {
    this.surveyForm = this.parentFormGroup.control;
  }

  saveSurveyWithUser() {
    this.errorMessages = this.surveyService.checkIfSurveyComplete(this.survey);
    if (this.errorMessages.length > 0) {
      return;
    }

    if (this.loggedIn) {
      this.keycloak.loadUserProfile().then(userProfile => {
        let email = userProfile.email;
        this.userService.findUserByEMail(email).subscribe(
          (response: User) => {
            this.survey.userId = response.id;
            this.saveSurvey();
          }, (error: HttpErrorResponse) => {
            console.log(error);
            let user = this.userService.createUserFromKeycloakUserProfile(userProfile);
            this.userService.saveUser(user).subscribe(
              (response: User) => {
                this.survey.userId = response.id;
                this.saveSurvey();
              }
            );
          }
        );
      })
    } else {
      this.saveSurvey();
    }
  }

  private saveSurvey() {
    this.survey.setName(this.name?.value);
    this.survey.setDescription(this.description?.value);
    this.survey.setStartDate(this.startDate?.value);
    this.survey.setEndDate(this.endDate?.value);
    this.survey.setOpenAccess(this.openAccess?.value);
    this.survey.setAnonymousParticipation(this.anonymousParticipation?.value);

    let creatorNameValue = this.creatorName?.value;
    if (creatorNameValue?.trim() !== '') {
      this.survey.setCreatorName(creatorNameValue);
    } else {
      this.survey.setCreatorName('Anonym');
    }

    let newSurvey: Survey;
    let accessId: string;

    this.surveyService.saveSurvey(this.survey).subscribe(
      (response: Survey) => {
        newSurvey = response;
        accessId = <string>newSurvey.accessId;
        console.log(newSurvey);

        this.router.navigate(["surveys", accessId]);
      }, () => {
        this.errorMessages = [];
        this.errorMessages.push(this.backendErrorMessage);
      });
  }
}
