import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Survey} from "../../model/survey";
import {environment} from "../../../environments/environment";
import {QuestionGroup} from "../../model/question-group";
import {SurveyEndDateOnly} from "../../model/survey-end-date-only";

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

  public updateSurvey(survey: Survey) {
    return this.http.put<Survey>(this.surveyUrl, survey);
  }

  public patchEndDate(surveyEndDateOnly: SurveyEndDateOnly) {
    return this.http.patch<Survey>(this.surveyUrl, surveyEndDateOnly);
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

  public checkIfSurveyComplete(survey: Survey): string[] {
    let errorMessages: string[] = [];
    return this.checkIfQuestionGroupsComplete(survey, errorMessages);
  }

  private checkIfQuestionGroupsComplete(survey: Survey, errorMessages: string[]): string[] {
    if (survey.questionGroups.length === 0) {
      errorMessages.push('Die Umfrage enthält keine Frageblöcke!');
    } else {
      survey.questionGroups.forEach((questionGroup, questionGroupIndex) => {
        if (questionGroup.questions.length === 0) {
          errorMessages.push('Der Frageblock \'' + questionGroup.title + '\' [' + (questionGroupIndex + 1)
            + '] enthält keine Fragen!')
        } else {
          errorMessages = this.checkIfQuestionsComplete(questionGroup, questionGroupIndex, errorMessages)
        }
      })
    }
    return errorMessages;
  }

  private checkIfQuestionsComplete(questionGroup: QuestionGroup, questionGroupIndex: number, errorMessages: string[]): string[] {
    questionGroup.questions.forEach((question, questionIndex) => {
      if (question.questionType === 'MULTIPLE_CHOICE') {
        let checkboxGroup = question.checkboxGroup;
        let noOfCheckboxes = checkboxGroup?.checkboxes.length;

        if (noOfCheckboxes === 0) {
          errorMessages.push("Frageblock: '" + questionGroup.title + "', Frage: '" + question.text +
            "' [" + (questionGroupIndex + 1) + ", " + (questionIndex + 1) + "]." +
            "\nDiese Frage enthält noch keine Antwortmöglichkeiten.");
        } else {
          if (!checkboxGroup?.multipleSelect && noOfCheckboxes! < 2) {
            errorMessages.push("Frageblock: '" + questionGroup.title + "', Frage: '" + question.text +
              "' [" + (questionGroupIndex + 1) + ", " + (questionIndex + 1) + "]." +
              "\nBei einer Frage mit Antwortmöglichkeiten müssen mind. 2 Antworten gegeben sein.");
          } else if (checkboxGroup?.multipleSelect && noOfCheckboxes! < checkboxGroup.maxSelect) {
            errorMessages.push("Frageblock: '" + questionGroup.title + "', Frage: '" + question.text +
              "' [" + (questionGroupIndex + 1) + ", " + (questionIndex + 1) + "]." +
              "\nBei einer Frage mit Antwortmöglichkeiten müssen mind. 2 Antworten gegeben sein, " +
              "bzw. mind. so viele Antworten wie bei der Mehrfachauswahl maximal erlaubt sind.");
          }
        }
      } else if (question.questionType === 'RANKING') {
        let rankingGroup = question.rankingGroup;
        let noOfOptions = rankingGroup?.options.length;

        if (noOfOptions === undefined || noOfOptions < 2) {
          errorMessages.push("Frageblock: '" + questionGroup.title + "', Frage: '" + question.text +
            "' [" + (questionGroupIndex + 1) + ", " + (questionIndex + 1) + "]." +
            "\nEine Rankingfrage muss mindestens zwei Optionen beinhalten.")
        }
      }
    })
    return errorMessages;
  }
}
