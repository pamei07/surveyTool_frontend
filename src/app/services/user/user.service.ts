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

  public saveUser(user: User) {
    return this.http.post<User>(this.surveyUrl + '/postUser', user);
  }
}
