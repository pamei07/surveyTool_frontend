import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.component.html'
})

export class AppHeaderComponent {

  loggedIn!: boolean;

  constructor(private router: Router,
              private keycloak: KeycloakService) {
    keycloak.isLoggedIn().then(isLoggedIn => this.loggedIn = isLoggedIn);
  }

  public login() {
    this.keycloak.login({
      redirectUri: window.location.origin + window.location.pathname
    });
  }

  public logoff() {
    this.keycloak.logout(window.location.origin);
  }
}
