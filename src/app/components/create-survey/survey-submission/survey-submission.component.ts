import {Component, Input} from '@angular/core';
import {Survey} from "../../../model/survey";
import {SurveyService} from "../../../services/survey/survey.service";
import {Router} from "@angular/router";
import {QuestionGroup} from "../../../model/question-group";
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../model/user";

@Component({
  selector: 'app-survey-submission',
  templateUrl: 'survey-submission.component.html'
})

export class SurveySubmissionComponent {

  @Input() survey!: Survey;
  errorMessages: string[] = [];
  private backendErrorMessage: string = "Beim Speichern der Umfrage ist etwas schiefgelaufen.\n" +
    " Bitte überpüfen Sie Ihre Angaben und versuchen Sie es erneut.";

  surveySubmissionForm = this.fb.group({
    userName: ['', [Validators.maxLength(255)]],
    openAccess: false
  })

  get userName() {
    return this.surveySubmissionForm.get('userName');
  }

  get openAccess() {
    return this.surveySubmissionForm.get('openAccess');
  }

  constructor(private surveyService: SurveyService,
              private userService: UserService,
              private fb: FormBuilder,
              private router: Router) {
  }

  saveSurveyWithUser() {
    if (!this.checkIfSurveyComplete(this.survey)) {
      return;
    }

    let userName = this.userName?.value;
    let user = this.userService.createUser(userName);
    this.userService.saveUser(user).subscribe(
      (response: User) => {
        this.saveSurvey(response);
      }, () => {
        this.errorMessages = [];
        this.errorMessages.push(this.backendErrorMessage);
      })
  }

  private saveSurvey(user: User) {
    this.survey.setUserId(user?.id);
    this.survey.setOpenAccess(this.openAccess?.value);

    let newSurvey: Survey;
    let accessId: string;

    this.surveyService.saveSurvey(this.survey).subscribe(
      (response: Survey) => {
        newSurvey = response;
        accessId = <string>newSurvey.accessId;
        console.log(newSurvey);

        this.router.navigate(["surveys", accessId]);
      }, () => {
        this.errorMessages = [];
        this.errorMessages.push(this.backendErrorMessage);
      });
  }

  private checkIfSurveyComplete(survey: Survey): boolean {
    this.errorMessages = [];
    return this.checkIfQuestionGroupsComplete(survey);
  }

  private checkIfQuestionGroupsComplete(survey: Survey): boolean {
    let isComplete = true;
    if (survey.questionGroups.length === 0) {
      this.errorMessages.push('Die Umfrage enthält keine Frageblöcke!');
      isComplete = false;
    } else {
      survey.questionGroups.forEach((questionGroup, questionGroupIndex) => {
        if (questionGroup.questions.length === 0) {
          this.errorMessages.push('Der Frageblock \'' + questionGroup.title + '\' [' + (questionGroupIndex + 1)
            + '] enthält keine Fragen!')
          isComplete = false;
        } else {
          isComplete = this.checkIfQuestionsComplete(questionGroup, questionGroupIndex);
        }
      })
    }
    return isComplete;
  }


  private checkIfQuestionsComplete(questionGroup: QuestionGroup, questionGroupIndex: number): boolean {
    let isComplete = true;
    questionGroup.questions.forEach((question, questionIndex) => {
      if (question.hasCheckbox) {
        let checkboxGroup = question.checkboxGroup;
        let noOfCheckboxes = checkboxGroup?.checkboxes.length;

        if (noOfCheckboxes === 0) {
          this.errorMessages.push("Frageblock: '" + questionGroup.title + "', Frage: '" + question.text +
            "' [" + (questionGroupIndex + 1) + ", " + (questionIndex + 1) + "]" +
            "\nDiese Frage enthält noch keine Antwortmöglichkeiten.");
          isComplete = false;
        } else {
          if (!checkboxGroup?.multipleSelect && noOfCheckboxes! < 2) {
            this.errorMessages.push("Frageblock: '" + questionGroup.title + "', Frage: '" + question.text +
              "' [" + (questionGroupIndex + 1) + ", " + (questionIndex + 1) + "]" +
              "\nBei einer Frage mit Auswahlmöglichkeiten müssen mind. 2 Antworten gegeben sein.");
            isComplete = false;
          } else if (checkboxGroup?.multipleSelect && noOfCheckboxes! < checkboxGroup!.maxSelect) {
            this.errorMessages.push("Frageblock: '" + questionGroup.title + "', Frage: '" + question.text +
              "' [" + (questionGroupIndex + 1) + ", " + (questionIndex + 1) + "]" +
              "\nBei einer Frage mit Auswahlmöglichkeiten müssen mind. 2 Antworten gegeben sein, " +
              "bzw. mind. so viele Antworten wie bei der Mehrfachauswahl maximal erlaubt sind.");
            isComplete = false;
          }
        }

      }
    })

    return isComplete;
  }
}
