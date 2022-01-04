import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Survey} from "../../model/survey";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private readonly surveyUrl: string = environment.baseUrl + 'surveys';

  constructor(private http: HttpClient) {
  }

  public saveSurvey(survey: Survey) {
    return this.http.post<Survey>(this.surveyUrl, survey);
  }

  public deleteSurvey(survey: Survey) {
    return this.http.delete(this.surveyUrl + '/' + survey.id);
  }

  public findSurveyByAccessId(accessId: string | null) {
    return this.http.get<Survey>(this.surveyUrl + '?accessId=' + accessId);
  }

  public findSurveyByParticipationId(participationId: string | null) {
    return this.http.get<Survey>(this.surveyUrl + '?participationId=' + participationId);
  }

  public findSurveysThatAreOpenAccess() {
    return this.http.get<Survey[]>(this.surveyUrl);
  }

  public findSurveysByUserId(userId: number | undefined) {
    return this.http.get<Survey[]>(this.surveyUrl + '/users/' + userId);
  }
}
