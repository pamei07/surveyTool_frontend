import {KeycloakService} from 'keycloak-angular';
import {environment} from '../environments/environment';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
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
        console.error(error)
        reject(error);
      }
    }).catch(() => {
      // If catch block is not reached => reinstall keycloak-js dependency (might fix it?)
      console.error("Keycloak failed to initialize.")
    });
  };
}
