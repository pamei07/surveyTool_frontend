import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Answer} from "../../model/answer";

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private readonly surveyUrl: string;

  constructor(private http: HttpClient) {
    this.surveyUrl = 'http://localhost:8080/answers';
  }

  public saveAnswers(answerArray: Answer[]) {
    return this.http.post(this.surveyUrl, answerArray);
  }

  public findAnswersByQuestionId(questionId: number | undefined) {
    return this.http.get<Answer[]>(this.surveyUrl + '/questions/' + questionId);
  }
}
