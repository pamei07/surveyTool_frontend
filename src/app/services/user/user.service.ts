import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../model/user";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly surveyUrl: string = environment.baseUrl + 'users';

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

  public saveUser(user: User) {
    return this.http.post<User>(this.surveyUrl, user);
  }

  public findParticipatingUsersBySurveyId(surveyId: number | undefined) {
    return this.http.get<User[]>(this.surveyUrl + '/surveys/' + surveyId);
  }
}
