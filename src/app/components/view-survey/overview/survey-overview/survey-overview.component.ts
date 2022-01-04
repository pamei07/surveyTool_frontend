import {Component, Input} from '@angular/core';
import {Survey} from "../../../../model/survey";
import {KeycloakService} from "keycloak-angular";
import {UserService} from "../../../../services/user/user.service";
import {User} from "../../../../model/user";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-survey-overview',
  templateUrl: 'survey-overview.component.html'
})

export class SurveyOverviewComponent {

  @Input() survey!: Survey;
  authorized: boolean = false;

  constructor(private keycloak: KeycloakService,
              private userService: UserService) {
    keycloak.isLoggedIn().then(isLoggedIn => {
      if (isLoggedIn) {
        keycloak.loadUserProfile().then(userProfile => {
          this.userService.findUserByEMail(userProfile.email).subscribe(
            (response: User) => {
              if (response.id === this.survey.userId) {
                this.authorized = true;
              }
            }, (error: HttpErrorResponse) => {
              console.log(error);
              let user = userService.createUserFromKeycloakUserProfile(userProfile);
              userService.saveUser(user).subscribe(
                (response: User) => {
                  if (response.id === this.survey.userId) {
                    this.authorized = true;
                  }
                }
              );
            }
          )
        })
      }
    })
  }

}
