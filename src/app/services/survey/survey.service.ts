import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Survey} from "../../model/survey";

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private readonly surveyUrl: string;

  constructor(private http: HttpClient) {
    this.surveyUrl = 'http://localhost:8080/surveys';
  }

  public saveSurvey(survey: Survey) {
    return this.http.post<Survey>(this.surveyUrl, survey);
  }

  public getSurveyByAccessId(accessId: string | null) {
    return this.http.get<Survey>(this.surveyUrl + '/' + accessId);
  }

  public getSurveyOverviewByUuid(uuid: string | null) {
    return this.http.get<Survey>(this.surveyUrl + '/answers?uuid=' + uuid);
  }

  public getSurveysThatAreOpenAccess() {
    return this.http.get<Survey[]>(this.surveyUrl + '/openAccess');
  }
}
