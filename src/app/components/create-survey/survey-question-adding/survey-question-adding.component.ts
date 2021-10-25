import {Component, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";
import {QuestionGroup} from "../../../model/question-group";

@Component({
  selector: 'survey-question-adding',
  templateUrl: 'survey-question-adding.component.html'
})

export class SurveyQuestionAddingComponent implements OnInit {

  survey: Survey;

  constructor() {
    this.survey = JSON.parse(<string>sessionStorage.getItem('newSurvey'));
  }

  ngOnInit() {
    console.log(this.survey);
  }

  addQuestionGroup(newQuestionGroup: QuestionGroup) {
    console.log(newQuestionGroup);
    this.survey.questionGroups?.push(newQuestionGroup);

    sessionStorage.setItem('newSurvey', JSON.stringify(this.survey));
  }
}
