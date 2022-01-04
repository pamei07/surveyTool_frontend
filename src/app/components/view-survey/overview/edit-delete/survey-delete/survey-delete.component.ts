import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {matchesSurveyName} from "../../../../../directives/match-survey-name-validation.directive";
import {Survey} from "../../../../../model/survey";
import {SurveyService} from "../../../../../services/survey/survey.service";
import {Router} from "@angular/router";
import {KeycloakService} from "keycloak-angular";
import {User} from "../../../../../model/user";
import {UserService} from "../../../../../services/user/user.service";

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
              private keycloak: KeycloakService,
              private surveyService: SurveyService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.confirmDeletionForm = this.fb.group({
        surveyName: ['', [Validators.required, matchesSurveyName(this.survey)]]
      }
    )
  }

  deleteSurvey() {
    this.keycloak.isLoggedIn().then(isLoggedIn => {
      if (isLoggedIn) {
        this.keycloak.loadUserProfile().then(userProfile => {
          this.userService.findUserByEMail(userProfile.email).subscribe(
            (response: User) => {
              if (response.id === this.survey.userId) {
                this.surveyService.deleteSurvey(this.survey).subscribe(
                  () => {
                    this.router.navigate(['/profile/surveys']);
                  }
                );
              } else {
                console.log('not authorized');
              }
            }
          )
        })
      } else {
        console.log('not authorized');
      }
    })
  }
}
