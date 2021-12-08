import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Answer} from "../../model/answer";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private readonly surveyUrl: string = environment.baseUrl + 'answers';

  constructor(private http: HttpClient) {
  }

  public saveAnswers(answerArray: Answer[]) {
    return this.http.post(this.surveyUrl, answerArray);
  }

  public findAnswersByQuestionId(questionId: number | undefined) {
    return this.http.get<Answer[]>(this.surveyUrl + '/questions/' + questionId);
  }
}
