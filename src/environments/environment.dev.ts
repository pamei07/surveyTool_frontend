export const environment = {
  production: false,
  baseUrl: 'http://localhost:8080/',
  frontendUrl: 'https://umfragetool-frontend-dev.herokuapp.com/',
  keycloak: {
    issuer: 'https://umfragetool-keycloak-dev.herokuapp.com/auth/',
    realm: 'Umfragetool',
    clientId: 'surveytool-frontend'
  }
};
