import {Component, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";
import {SurveyService} from "../../../services/survey/survey.service";
import {User} from "../../../model/user";
import {HttpErrorResponse} from "@angular/common/http";
import {KeycloakService} from "keycloak-angular";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-my-surveys',
  templateUrl: './my-surveys.component.html'
})
export class MySurveysComponent implements OnInit {

  surveys!: Survey[];

  constructor(private keycloak: KeycloakService,
              private surveyService: SurveyService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.keycloak.isLoggedIn().then(isLoggedIn => {
      if (isLoggedIn) {
        this.keycloak.loadUserProfile().then(userProfile => {
          let email = userProfile.email;
          this.userService.findUserByEMail(email).subscribe(
            (response: User) => {
              let userId = response.id;
              this.surveyService.findSurveysByUserId(userId).subscribe((surveys) => {
                this.surveys = surveys;
              })
            }, (error: HttpErrorResponse) => {
              console.log(error);
              let user = this.userService.createUserFromKeycloakUserProfile(userProfile);
              this.userService.saveUser(user).subscribe(
                (response: User) => {
                  let userId = response.id;
                  this.surveyService.findSurveysByUserId(userId).subscribe((surveys) => {
                    this.surveys = surveys;
                  })
                }
              );
            }
          );
        })
      }
    })
  }
}
