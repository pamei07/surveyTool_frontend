import {Component} from '@angular/core';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html'
})
export class ProfileDropdownComponent {

  username: String;

  constructor(private keycloak: KeycloakService) {
    this.username = keycloak.getUsername();
  }

  public logout() {
    this.keycloak.logout(window.location.origin);
  }

}
