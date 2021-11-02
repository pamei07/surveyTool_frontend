import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Answer} from "../../model/answer";

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private readonly surveyUrl: string;

  constructor(private http: HttpClient) {
    this.surveyUrl = 'http://localhost:8080';
  }

  public saveAnswers(answerArray: Answer[]) {
    return this.http.post(this.surveyUrl + '/postAnswers', answerArray);
  }

  public getAnswersByQuestionId(questionId: number | undefined) {
    return this.http.get(this.surveyUrl + '/getAnswersByQuestionId?questionId=' + questionId);
  }

}
