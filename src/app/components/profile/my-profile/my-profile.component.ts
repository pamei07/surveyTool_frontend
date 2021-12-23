import {Component} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../model/user";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html'
})
export class MyProfileComponent {

  username: string | undefined;
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;

  constructor(private keycloak: KeycloakService,
              private userService: UserService) {
    keycloak.isLoggedIn().then(isLoggedIn => {
      if (isLoggedIn) {
        keycloak.loadUserProfile().then(userProfile => {
          let eMail = userProfile.email;
          userService.findUserByEMail(eMail).subscribe(
            (response: User) => {
              this.setProfileAttributes(response);
            }, (error: HttpErrorResponse) => {
              console.log(error);
              let user = userService.createUserFromKeycloakUserProfile(userProfile);
              userService.saveUser(user).subscribe(
                (response: User) => {
                  this.setProfileAttributes(response);
                }
              );
            }
          );
        })
      }
    })
  }

  private setProfileAttributes(response: User) {
    this.username = response.name;
    this.email = response.email;
    this.firstName = response.firstName;
    this.lastName = response.lastName;
  }
}
