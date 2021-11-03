import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../../model/survey";

@Component({
  selector: 'question-delete',
  templateUrl: 'question-delete.component.html'
})

export class QuestionDeleteComponent implements OnInit {

  @Input() survey!: Survey;
  @Input() indexQuestionGroup!: number;
  @Input() indexQuestion!: number;

  constructor() {
  }

  ngOnInit() {
  }

  deleteQuestion(indexQuestion: number) {
    this.survey.questionGroups![this.indexQuestionGroup].questions!.splice(indexQuestion, 1);
  }
}
