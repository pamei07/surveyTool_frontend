import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";
import {SurveyService} from "../../../services/survey/survey.service";
import {Router} from "@angular/router";
import {QuestionGroup} from "../../../model/question-group";

@Component({
  selector: 'survey-submission',
  templateUrl: 'survey-submission.component.html'
})

export class SurveySubmissionComponent implements OnInit {

  @Input() survey!: Survey;
  errorMessages: string[] = [];

  constructor(private surveyService: SurveyService,
              private router: Router) {
  }

  ngOnInit() {
  }

  saveSurvey() {
    if (this.checkIfAnythingEmpty(this.survey)) {
      return;
    }

    let newSurvey: Survey;
    let surveyID: number;

    this.surveyService.saveSurvey(this.survey).subscribe(savedSurvey => {
      newSurvey = <Survey>savedSurvey;
      surveyID = <number>newSurvey.id;
      console.log(newSurvey);

      this.router.navigate(["createSurvey", surveyID, "final"]);
    });
  }

  private checkIfAnythingEmpty(survey: Survey): boolean {
    this.errorMessages = [];
    return this.checkIfQuestionGroupsEmpty(survey);
  }

  private checkIfQuestionGroupsEmpty(survey: Survey): boolean {
    let anythingEmpty = false;
    if (survey.questionGroups.length === 0) {
      this.errorMessages.push('Die Umfrage enthält keine Frageblöcke!');
      anythingEmpty = true;
    } else {
      survey.questionGroups.forEach((questionGroup, questionGroupIndex) => {
        if (questionGroup.questions.length === 0) {
          this.errorMessages.push('Der Frageblock \'' + questionGroup.title + '\' [' + (questionGroupIndex + 1)
            + '] enthält keine Fragen!')
          anythingEmpty = true;
        } else {
          anythingEmpty = this.checkIfCheckboxGroupsEmpty(questionGroup, questionGroupIndex);
        }
      })
    }
    return anythingEmpty;
  }

  private checkIfCheckboxGroupsEmpty(questionGroup: QuestionGroup, questionGroupIndex: number): boolean {
    let anythingEmpty = false;
    questionGroup.questions.forEach((question, questionIndex) => {
      if (question.hasCheckbox) {
        let checkboxGroup = question.checkboxGroup;
        let noOfCheckboxes = checkboxGroup?.checkboxes.length;

        if (noOfCheckboxes === 0) {
          this.errorMessages.push("Frageblock: '" + questionGroup.title + "', Frage: '" + question.text +
            "' [" + (questionGroupIndex + 1) + ", " + (questionIndex + 1) + "]" +
            "\nDiese Frage enthält noch keine Antwortmöglichkeiten.");
          anythingEmpty = true;
        } else {
          if (!checkboxGroup?.multipleSelect && noOfCheckboxes! < 2) {
            this.errorMessages.push("Frageblock: '" + questionGroup.title + "', Frage: '" + question.text +
              "' [" + (questionGroupIndex + 1) + ", " + (questionIndex + 1) + "]" +
              "\nBei einer Frage mit Auswahlmöglichkeiten müssen mind. 2 Antworten gegeben sein.");
            anythingEmpty = true;
          } else if (checkboxGroup?.multipleSelect && noOfCheckboxes! < checkboxGroup!.maxSelect) {
            this.errorMessages.push("Frageblock: '" + questionGroup.title + "', Frage: '" + question.text +
              "' [" + (questionGroupIndex + 1) + ", " + (questionIndex + 1) + "]" +
              "\nBei einer Frage mit Auswahlmöglichkeiten müssen mind. 2 Antworten gegeben sein, " +
              "bzw. mind. so viele Antworten wie bei der Mehrfachauswahl maximal erlaubt sind.");
            anythingEmpty = true;
          }
        }

      }
    })

    return anythingEmpty;
  }
}
