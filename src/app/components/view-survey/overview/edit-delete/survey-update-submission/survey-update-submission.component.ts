import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../../../model/survey";
import {FormGroup, FormGroupDirective} from "@angular/forms";
import {SurveyService} from "../../../../../services/survey/survey.service";
import {Router} from "@angular/router";
import {KeycloakService} from "keycloak-angular";
import {User} from "../../../../../model/user";
import {UserService} from "../../../../../services/user/user.service";
import {AnswerService} from "../../../../../services/answer/answer.service";
import {Answer} from "../../../../../model/answer";

@Component({
  selector: 'app-survey-update-submission',
  templateUrl: './survey-update-submission.component.html'
})
export class SurveyUpdateSubmissionComponent implements OnInit {

  @Input() survey!: Survey;
  surveyUpdateForm!: FormGroup;
  errorMessages: string[] = [];
  private backendErrorMessage: string = "Beim Speichern der Umfrage ist etwas schiefgelaufen.\n" +
    " Bitte überpüfen Sie Ihre Angaben und versuchen Sie es erneut.";
  private authenticationErrorMessage: string = "Ihr Sitzung ist abgelaufen. Bitte loggen Sie sich erneut ein.";
  private alreadyAnsweredErrorMessage: string = "Es wurde bereits an dieser Umfrage teilgenommen. " +
    "Sie können diese Umfrage daher nicht mehr bearbeiten.";

  get name() {
    return this.surveyUpdateForm.get('name');
  }

  get description() {
    return this.surveyUpdateForm.get('description');
  }

  get startDate() {
    return this.surveyUpdateForm.get('startDate');
  }

  get endDate() {
    return this.surveyUpdateForm.get('endDate');
  }

  get creatorName() {
    return this.surveyUpdateForm.get('creatorName');
  }

  get openAccess() {
    return this.surveyUpdateForm.get('openAccess');
  }

  get anonymousParticipation() {
    return this.surveyUpdateForm.get('anonymousParticipation');
  }

  constructor(private parentFormGroup: FormGroupDirective,
              private router: Router,
              private keycloakService: KeycloakService,
              private surveyService: SurveyService,
              private userService: UserService,
              private answerService: AnswerService) {
  }

  ngOnInit() {
    this.surveyUpdateForm = this.parentFormGroup.control;
    console.log(this.survey)
  }

  checkIfChangesValid() {
    this.errorMessages = this.surveyService.checkIfSurveyComplete(this.survey);
    if (this.errorMessages.length > 0) {
      return;
    }

    this.keycloakService.isLoggedIn().then(isLoggedIn => {
      if (isLoggedIn) {
        this.keycloakService.loadUserProfile().then(userProfile => {
          this.userService.findUserByEMail(userProfile.email).subscribe(
            (userResponse: User) => {
              if (userResponse.id === this.survey.userId) {
                this.saveChanges()
              }
            })
        })
      } else {
        this.errorMessages.push(this.authenticationErrorMessage);
      }
    })
  }

  private saveChanges() {
    console.log(this.survey.id)
    this.survey.name = this.name?.value;
    this.survey.description = this.description?.value;
    this.survey.startDate = this.startDate?.value;
    this.survey.endDate = this.endDate?.value;
    this.survey.openAccess = this.openAccess?.value;
    this.survey.anonymousParticipation = this.anonymousParticipation?.value;

    let creatorNameValue = this.creatorName?.value;
    if (creatorNameValue?.trim() !== '') {
      this.survey.creatorName = creatorNameValue;
    } else {
      this.survey.creatorName = 'Anonym';
    }

    let updatedSurvey: Survey;
    let accessId: string;

    this.answerService.findAnswersBySurveyId(this.survey.id).subscribe(
      (response: Answer[]) => {
        if (response.length > 0) {
          this.errorMessages = [];
          this.errorMessages.push(this.alreadyAnsweredErrorMessage);
        } else {
          this.surveyService.updateSurvey(this.survey).subscribe(
            (response: Survey) => {
              updatedSurvey = response;
              accessId = <string>updatedSurvey.accessId;
              console.log(updatedSurvey);

              this.router.navigate(["surveys", accessId]);
            }, () => {
              this.errorMessages = [];
              this.errorMessages.push(this.backendErrorMessage);
            });
        }
      }
    )
  }
}