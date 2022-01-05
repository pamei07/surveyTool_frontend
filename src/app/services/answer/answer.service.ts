import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Answer} from "../../model/answer";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private readonly answersUrl: string = environment.baseUrl + 'answers';

  constructor(private http: HttpClient) {
  }

  public saveAnswers(answerArray: Answer[]) {
    return this.http.post(this.answersUrl, answerArray);
  }

  public findAnswersByQuestionId(questionId: number | undefined) {
    return this.http.get<Answer[]>(this.answersUrl + '/questions/' + questionId);
  }

  public findAnswersBySurveyId(surveyId: number | undefined) {
    return this.http.get<Answer[]>(this.answersUrl + '/surveys/' + surveyId);
  }
}
