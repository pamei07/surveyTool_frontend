import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../../model/survey";

@Component({
  selector: 'question-list',
  templateUrl: 'question-list.component.html'
})

export class QuestionListComponent implements OnInit {

  @Input() indexQuestionGroup!: number;
  @Input() survey!: Survey;

  constructor() {
  }

  ngOnInit() {
  }

  deleteQuestion(indexQuestion: number) {
    this.survey.questionGroups![this.indexQuestionGroup].questions!.splice(indexQuestion, 1);
    sessionStorage.setItem('newSurvey', JSON.stringify(this.survey));
  }

  updateQuestion(indexQuestion: number) {
    sessionStorage.setItem('newSurvey', JSON.stringify(this.survey));
  }
}
