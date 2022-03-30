import {KeycloakService} from 'keycloak-angular';
import {environment} from '../environments/environment';

export function initializer(keycloak: KeycloakService): () => Promise<any> {

  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      if (!environment.keycloak.active) {
        reject();
      } else {
        try {
          await keycloak.init({
            config: {
              url: environment.keycloak.issuer,
              realm: environment.keycloak.realm,
              clientId: environment.keycloak.clientId,
            },
            loadUserProfileAtStartUp: true,
            initOptions: {
              onLoad: "check-sso",
              checkLoginIframe: true
            },
            bearerExcludedUrls: ['/assets'],
          });
          resolve(resolve);
        } catch (error) {
          reject();
        }
      }
    }).catch(() => {
      // If catch block is not reached => reinstall keycloak-js dependency (might fix it?)
      if (!environment.keycloak.active) {
        console.error("Keycloak is currently not enabled.")
      } else {
        console.error("Keycloak failed to initialize.")
      }
    });
  };
}
