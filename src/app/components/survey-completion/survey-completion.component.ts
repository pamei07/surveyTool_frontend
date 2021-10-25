import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../model/survey";
import {QuestionGroup} from "../../model/question-group";

@Component({
  selector: 'survey-completion',
  templateUrl: 'survey-completion.component.html'
})

export class SurveyCompletionComponent implements OnInit {

  @Input() survey!: Survey;

  constructor() {
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
