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
    console.log(answerArray[0].question);
    return this.http.post(this.surveyUrl + '/postAnswers', answerArray);
  }
}
