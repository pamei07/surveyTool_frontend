import {Component} from '@angular/core';
import {AuthConfig, NullValidationHandler, OAuthService} from "angular-oauth2-oidc";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.component.html'
})

export class AppHeaderComponent {

  private authConfig: AuthConfig = {
    issuer: environment.keyCloakUrl + 'auth/realms/Umfragetool',
    redirectUri: window.location.origin,
    clientId: 'surveytool-frontend',
    scope: 'openid profile email offline_access',
    responseType: 'code',
    showDebugInformation: true
  };

  constructor(private oauthService: OAuthService) {
    this.configure();
  }

  public login() {
    this.oauthService.initLoginFlow();
  }

  public logoff() {
    this.oauthService.logOut();
  }

  private configure() {
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}
