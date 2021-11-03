import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../../model/survey";

@Component({
  selector: 'question-group-delete',
  templateUrl: 'question-group-delete.component.html'
})

export class QuestionGroupDeleteComponent implements OnInit {

  @Input() survey!: Survey;
  @Input() indexQuestionGroup!: number;

  constructor() {
  }

  ngOnInit() {
  }

  deleteQuestionGroup(indexQuestionGroup: number) {
    this.survey.questionGroups?.splice(indexQuestionGroup, 1);
  }
  
}
