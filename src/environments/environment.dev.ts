export const environment = {
  production: false,
  baseUrl: 'https://umfragetool-backend-dev.herokuapp.com/',
  frontendUrl: 'https://umfragetool-frontend-dev.herokuapp.com/',
  keycloak: {
    issuer: 'https://umfragetool-keycloak-dev.herokuapp.com/auth/',
    realm: 'Umfragetool',
    clientId: 'surveytool-frontend'
  }
};
