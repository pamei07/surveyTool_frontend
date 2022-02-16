import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../model/user";
import {environment} from "../../../environments/environment";
import {Keycloak} from "keycloak-angular/lib/core/services/keycloak.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly usersUrl: string = environment.baseUrl + 'users';

  constructor(private http: HttpClient) {
  }

  public createUser(name: string): User {
    let user: User = new User();
    if (name.trim() !== '') {
      user.setName(name);
    } else {
      user.setName('Anonym');
    }
    return user;
  }

  public createUserFromKeycloakUserProfile(userProfile: Keycloak.KeycloakProfile) {
    let user: User = new User();
    user.setName(userProfile.username);
    user.setFirstName(userProfile.firstName);
    user.setLastName(userProfile.lastName);
    user.setEmail(userProfile.email);
    return user;
  }

  public saveUser(user: User) {
    return this.http.post<User>(this.usersUrl, user);
  }

  public findUserByEMail(email: string | undefined) {
    return this.http.get<User>(this.usersUrl + '?email=' + email);
  }
}
