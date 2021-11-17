import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly surveyUrl: string;

  constructor(private http: HttpClient) {
    this.surveyUrl = 'http://localhost:8080';
  }

  postUser(name: string) {
    let user: User = new User();
    if (name !== '') {
      user.setName(name);
    } else {
      user.setName('Anonym');
    }
    return this.saveUser(user);
  }

  public saveUser(user: User) {
    return this.http.post<User>(this.surveyUrl + '/postUser', user);
  }

  public getParticipatingUsersBySurveyId(surveyId: number | undefined) {
    return this.http.get<User[]>(this.surveyUrl + '/getParticipatingUsersBySurveyId?surveyId=' + surveyId);
  }

  public getUserById(creatorID: number | undefined) {
    return this.http.get<User>(this.surveyUrl + '/users?id=' + creatorID);
  }
}
